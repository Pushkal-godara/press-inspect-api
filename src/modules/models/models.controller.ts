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
} from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/public.decorator';

@ApiTags('Models')
@Controller('models')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) { }

  @RequirePermissions('models:create')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/model')
  createModel(@Body() createModelDto: CreateModelDto, @Req() req) {
    const currentUser = req.user;
    return this.modelsService.createModel(createModelDto, currentUser);
  }

  @RequirePermissions('models:read')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('models')
  findAll(@Req() req) {
    const currentUser = req.user;
    return this.modelsService.findAll(currentUser);
  }

  @RequirePermissions('models:update')
  @Roles('Engineer', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('update/model/:id')
  updateModel(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto, @Req() req) {
    const currentUser = req.user;
    return this.modelsService.updateModel(+id, updateModelDto, currentUser);
  }
}