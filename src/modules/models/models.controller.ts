import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/public.decorator';

import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { UpdateTechSpecificationDto } from './dto/update-tech-specification.dto';
import { CreateTechSpecificationDto } from './dto/create-tech-specification.dto';

import { S3Service } from '../../services/s3.service';
import { s3UploadConfig } from '../../config/multer.config';
import { ModelsService } from './models.service';

@ApiTags('Models')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('models')
export class ModelsController {
  constructor(
    private readonly modelsService: ModelsService,
    private readonly s3Service: S3Service
  ) { }

  @RequirePermissions('models:create')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create')
  createModel(@Body() createModelDto: CreateModelDto, @Req() req) {
    const currentUser = req.user;
    return this.modelsService.createModel(createModelDto, currentUser);
  }

  @RequirePermissions('models:read')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('all')
  findAll(@Req() req) {
    const currentUser = req.user;
    return this.modelsService.findAll(currentUser);
  }

  @RequirePermissions('models:update')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('update/:id')
  updateModel(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto, @Req() req) {
    const currentUser = req.user;
    return this.modelsService.updateModel(+id, updateModelDto, currentUser);
  }

  @RequirePermissions('models:delete')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Delete('delete/:id')
  removeModel(@Param('id') id: string, @Req() req) {
    const currentUser = req.user;
    return this.modelsService.removeModel(+id, currentUser);
  }

  // Tech Specification CRUD

  @RequirePermissions('models:create')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Create Tech Specification' })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'techSpecFile', maxCount: 1 },
      ],
      s3UploadConfig,
    ),
  )
  @ApiConsumes('multipart/form-data', 'application/json') // Accept both
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        model_id: { type: 'number' },
        date_of_upload: { type: 'string' },
        techSpecFile: { type: 'string', format: 'binary' },
        file_name: { type: 'string' },
      },
    },
  })
  @Post('create-tech-specification')
  async createTechSpecfication(
    @Body() createTechSpecificationDto: CreateTechSpecificationDto, 
    @Req() req,
    @UploadedFiles() files?: { techSpecFile?: Express.Multer.File[] },
  ) {
    const currentUser = req.user;
    const uploadedFiles = {
      techSpecFile: null
    };
    try {
      // Handle file uploads if present
      if (files?.techSpecFile && files.techSpecFile[0]) {
        const techSpecUrl = await this.s3Service.uploadFile(files.techSpecFile[0], 'tech-spec-files');
        createTechSpecificationDto.pdf = techSpecUrl;
        uploadedFiles.techSpecFile = techSpecUrl;
      }

      const techSpec = await this.modelsService.createTechSpecfication(createTechSpecificationDto, currentUser);
      
      return {
        success: true,
        message: 'Tech Specification created successfully',
        data: techSpec,
        ...(files && { uploadedFiles }) // Only include uploadedFiles if files were sent
      };

    } catch (error) {
      // Cleanup uploaded files if user creation fails
      await this.cleanupUploadedFiles(uploadedFiles);
      throw error;
    }
  }

  @RequirePermissions('models:update')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Update Tech Specification' })
  @ApiConsumes('multipart/form-data', 'application/json') // Accept both
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'techSpecFile', maxCount: 1 },
      ],
      s3UploadConfig,
    ),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        model_id: { type: 'number' },
        date_of_upload: { type: 'string' },
        pdf: { type: 'string', format: 'binary' },
        file_name: { type: 'string' },
      },
      required: ['model_id'],
    },
  })
  @Patch('updateTechSpecfication/:id')
  async updateTechSpecfication(
    @Param('id') idNumber: string,
    @Body() updateTechSpecificationDto: UpdateTechSpecificationDto,
    @Req() req,
    @UploadedFiles() files?: { techSpecFile?: Express.Multer.File[] },
  ) {
    const currentUser = req.user;
    const modelId = +idNumber;

    // data for old file cleanup
    const techSpecPdf = await this.modelsService.getTechSpecficationPdf(modelId, currentUser);
    const oldFiles = {
      techSpecFile: techSpecPdf.pdf
    };

    const newFiles = {
      techSpecFile: null
    };
  
    try {
      // Handle file uploads if present
      if (files?.techSpecFile && files.techSpecFile[0]) {
        const techSpecUrl = await this.s3Service.uploadFile(files.techSpecFile[0], 'tech-spec-files');
        updateTechSpecificationDto.pdf = techSpecUrl;
        newFiles.techSpecFile = techSpecUrl;
      }

      const updatedTechSpec = await this.modelsService.updateTechSpecfication(+modelId, updateTechSpecificationDto, currentUser);

      // Delete old files from S3 if new files were uploaded
      await this.cleanupOldFiles(oldFiles, newFiles);

      return {
        success: true,
        message: 'Tech Specification updated successfully',
        data: updatedTechSpec,
        ...(files && { uploadedFiles : newFiles}) // Only include uploadedFiles if files were sent
      };

    } catch (error) {
      // Cleanup uploaded files if update fails
      await this.cleanupUploadedFiles(newFiles);
      throw error;
    }
  }

  @RequirePermissions('models:read')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getTechSpecficationPdf/:id')
  getTechSpecficationPdf(@Param('id') id: string, @Req() req) { // Here id should be model id, so that we can get tech specfication for that model
    const currentUser = req.user;
    return this.modelsService.getTechSpecficationPdf(+id, currentUser);
  }

  @RequirePermissions('models:read')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getAllTechSpecficationPdf')
  getAllTechSpecficationPdf(@Req() req) {
    const currentUser = req.user;
    return this.modelsService.getAllTechSpecficationPdf(currentUser);
  }

  
  // // ========== HELPER METHODS ==========
  private async cleanupUploadedFiles(files: { techSpecFile?: string }) {
    const promises = [];

    if (files.techSpecFile) promises.push(this.s3Service.deleteFile(files.techSpecFile));

    await Promise.allSettled(promises);
  }

  private async cleanupOldFiles(oldFiles: any, newFiles: any) {
    const promises = [];

    if (newFiles.techSpecFile && oldFiles.techSpecFile) promises.push(this.s3Service.deleteFile(oldFiles.techSpecFile));

    await Promise.allSettled(promises);
  }
}