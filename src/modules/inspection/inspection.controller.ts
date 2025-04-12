import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { CreateInspectionJobDto } from './dto/create-inspection-job.dto';
import { CreateQualityParameterDto } from './dto/create-quality-parameter.dto';
import { CreateDefectTypeDto } from './dto/create-defect-type.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@ApiTags('inspection')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  // Inspection Job routes
  @Post('inspection-jobs')
  @ApiOperation({ summary: 'Create a new inspection job' })
  @ApiResponse({ status: 201, description: 'Inspection job successfully created' })
  createInspectionJob(@Request() req, @Body() createInspectionJobDto: CreateInspectionJobDto) {
    return this.inspectionService.createInspectionJob(req.user.id, createInspectionJobDto);
  }

  @Get('inspection-jobs')
  @ApiOperation({ summary: 'Get all inspection jobs' })
  @ApiResponse({ status: 200, description: 'List of inspection jobs' })
  findAllInspectionJobs() {
    return this.inspectionService.findAllInspectionJobs();
  }

  @Get('production-lines/:id/inspection-jobs')
  @ApiOperation({ summary: 'Get all inspection jobs for a production line' })
  @ApiResponse({ status: 200, description: 'List of inspection jobs for production line' })
  findInspectionJobsByProductionLine(@Param('id') id: string) {
    return this.inspectionService.findInspectionJobsByProductionLine(+id);
  }

  @Get('inspection-jobs/:id')
  @ApiOperation({ summary: 'Get inspection job by ID' })
  @ApiResponse({ status: 200, description: 'Inspection job found' })
  @ApiResponse({ status: 404, description: 'Inspection job not found' })
  findInspectionJobById(@Param('id') id: string) {
    return this.inspectionService.findInspectionJobById(+id);
  }

  @Patch('inspection-jobs/:id')
  @Roles('admin', 'manager', 'inspector')
  @ApiOperation({ summary: 'Update inspection job by ID' })
  @ApiResponse({ status: 200, description: 'Inspection job successfully updated' })
  @ApiResponse({ status: 404, description: 'Inspection job not found' })
  updateInspectionJob(@Param('id') id: string, @Body() updateInspectionJobDto: any) {
    return this.inspectionService.updateInspectionJob(+id, updateInspectionJobDto);
  }

  @Delete('inspection-jobs/:id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Delete inspection job by ID' })
  @ApiResponse({ status: 200, description: 'Inspection job successfully deleted' })
  @ApiResponse({ status: 404, description: 'Inspection job not found' })
  removeInspectionJob(@Param('id') id: string) {
    return this.inspectionService.removeInspectionJob(+id);
  }

  // Quality Parameter routes
  @Post('quality-parameters')
  @Roles('admin', 'manager', 'inspector')
  @ApiOperation({ summary: 'Create a new quality parameter' })
  @ApiResponse({ status: 201, description: 'Quality parameter successfully created' })
  createQualityParameter(@Body() createQualityParameterDto: CreateQualityParameterDto) {
    return this.inspectionService.createQualityParameter(createQualityParameterDto);
  }

  @Get('inspection-jobs/:id/quality-parameters')
  @ApiOperation({ summary: 'Get all quality parameters for an inspection job' })
  @ApiResponse({ status: 200, description: 'List of quality parameters' })
  findQualityParametersByInspectionJob(@Param('id') id: string) {
    return this.inspectionService.findQualityParametersByInspectionJob(+id);
  }

  @Get('quality-parameters/:id')
  @ApiOperation({ summary: 'Get quality parameter by ID' })
  @ApiResponse({ status: 200, description: 'Quality parameter found' })
  @ApiResponse({ status: 404, description: 'Quality parameter not found' })
  findQualityParameterById(@Param('id') id: string) {
    return this.inspectionService.findQualityParameterById(+id);
  }

  @Patch('quality-parameters/:id')
  @Roles('admin', 'manager', 'inspector')
  @ApiOperation({ summary: 'Update quality parameter by ID' })
  @ApiResponse({ status: 200, description: 'Quality parameter successfully updated' })
  @ApiResponse({ status: 404, description: 'Quality parameter not found' })
  updateQualityParameter(@Param('id') id: string, @Body() updateQualityParameterDto: any) {
    return this.inspectionService.updateQualityParameter(+id, updateQualityParameterDto);
  }

  @Delete('quality-parameters/:id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Delete quality parameter by ID' })
  @ApiResponse({ status: 200, description: 'Quality parameter successfully deleted' })
  @ApiResponse({ status: 404, description: 'Quality parameter not found' })
  removeQualityParameter(@Param('id') id: string) {
    return this.inspectionService.removeQualityParameter(+id);
  }

  // Defect Type routes
  @Post('defect-types')
  @Roles('admin', 'manager', 'inspector')
  @ApiOperation({ summary: 'Create a new defect type' })
  @ApiResponse({ status: 201, description: 'Defect type successfully created' })
  @ApiResponse({ status: 409, description: 'Defect type with the same name already exists' })
  createDefectType(@Body() createDefectTypeDto: CreateDefectTypeDto) {
    return this.inspectionService.createDefectType(createDefectTypeDto);
  }

  @Get('defect-types')
  @ApiOperation({ summary: 'Get all defect types' })
  @ApiResponse({ status: 200, description: 'List of defect types' })
  findAllDefectTypes() {
    return this.inspectionService.findAllDefectTypes();
  }

  @Get('defect-types/:id')
  @ApiOperation({ summary: 'Get defect type by ID' })
  @ApiResponse({ status: 200, description: 'Defect type found' })
  @ApiResponse({ status: 404, description: 'Defect type not found' })
  findDefectTypeById(@Param('id') id: string) {
    return this.inspectionService.findDefectTypeById(+id);
  }

  @Patch('defect-types/:id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Update defect type by ID' })
  @ApiResponse({ status: 200, description: 'Defect type successfully updated' })
  @ApiResponse({ status: 404, description: 'Defect type not found' })
  updateDefectType(@Param('id') id: string, @Body() updateDefectTypeDto: any) {
    return this.inspectionService.updateDefectType(+id, updateDefectTypeDto);
  }

  @Delete('defect-types/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete defect type by ID' })
  @ApiResponse({ status: 200, description: 'Defect type successfully deleted' })
  @ApiResponse({ status: 404, description: 'Defect type not found' })
  removeDefectType(@Param('id') id: string) {
    return this.inspectionService.removeDefectType(+id);
  }
}