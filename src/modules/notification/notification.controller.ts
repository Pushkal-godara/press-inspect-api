import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateAlertConfigDto } from './dto/create-alert-config.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('alert-configurations')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Create a new alert configuration' })
  @ApiResponse({ status: 201, description: 'Alert configuration successfully created' })
  create(@Body() createAlertConfigDto: CreateAlertConfigDto) {
    return this.notificationService.createAlertConfig(createAlertConfigDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all alert configurations' })
  @ApiResponse({ status: 200, description: 'List of alert configurations' })
  findAll() {
    return this.notificationService.findAllAlertConfigs();
  }

  @Get('inspection-job/:id')
  @ApiOperation({ summary: 'Get alert configurations by inspection job ID' })
  @ApiResponse({ status: 200, description: 'List of alert configurations for inspection job' })
  findByInspectionJobId(@Param('id') id: string) {
    return this.notificationService.findAlertConfigsByInspectionJobId(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get alert configuration by ID' })
  @ApiResponse({ status: 200, description: 'Alert configuration found' })
  @ApiResponse({ status: 404, description: 'Alert configuration not found' })
  findOne(@Param('id') id: string) {
    return this.notificationService.findAlertConfigById(+id);
  }

  @Patch(':id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Update alert configuration by ID' })
  @ApiResponse({ status: 200, description: 'Alert configuration successfully updated' })
  @ApiResponse({ status: 404, description: 'Alert configuration not found' })
  update(@Param('id') id: string, @Body() updateAlertConfigDto: any) {
    return this.notificationService.updateAlertConfig(+id, updateAlertConfigDto);
  }

  @Delete(':id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Delete alert configuration by ID' })
  @ApiResponse({ status: 200, description: 'Alert configuration successfully deleted' })
  @ApiResponse({ status: 404, description: 'Alert configuration not found' })
  remove(@Param('id') id: string) {
    return this.notificationService.removeAlertConfig(+id);
  }

  @Post(':id/test')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Send test notification for alert configuration' })
  @ApiResponse({ status: 200, description: 'Test notification sent' })
  @ApiResponse({ status: 404, description: 'Alert configuration not found' })
  sendTestNotification(@Param('id') id: string) {
    return this.notificationService.sendTestNotification(+id);
  }
}