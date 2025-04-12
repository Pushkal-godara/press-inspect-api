import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AlertConfiguration } from './entities/alert-configuration.entity';
import { CreateAlertConfigDto } from './dto/create-alert-config.dto';
import { InspectionService } from '../inspection/inspection.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(AlertConfiguration)
    private alertConfigModel: typeof AlertConfiguration,
    private inspectionService: InspectionService,
  ) {}

  async createAlertConfig(createAlertConfigDto: CreateAlertConfigDto): Promise<AlertConfiguration> {
    // Validate inspection job exists
    await this.inspectionService.findInspectionJobById(createAlertConfigDto.inspectionJobId);
    
    return this.alertConfigModel.create({ ...createAlertConfigDto });
  }

  async findAllAlertConfigs(): Promise<AlertConfiguration[]> {
    return this.alertConfigModel.findAll();
  }

  async findAlertConfigsByInspectionJobId(inspectionJobId: number): Promise<AlertConfiguration[]> {
    // Validate inspection job exists
    await this.inspectionService.findInspectionJobById(inspectionJobId);
    
    return this.alertConfigModel.findAll({
      where: { inspectionJobId },
    });
  }

  async findAlertConfigById(id: number): Promise<AlertConfiguration> {
    const alertConfig = await this.alertConfigModel.findByPk(id);
    
    if (!alertConfig) {
      throw new NotFoundException(`Alert configuration with ID ${id} not found`);
    }
    
    return alertConfig;
  }

  async updateAlertConfig(id: number, updateAlertConfigDto: any): Promise<AlertConfiguration> {
    const alertConfig = await this.findAlertConfigById(id);
    
    // If inspection job is being updated, validate it exists
    if (updateAlertConfigDto.inspectionJobId) {
      await this.inspectionService.findInspectionJobById(updateAlertConfigDto.inspectionJobId);
    }
    
    await alertConfig.update(updateAlertConfigDto);
    return this.findAlertConfigById(id);
  }

  async removeAlertConfig(id: number): Promise<void> {
    const alertConfig = await this.findAlertConfigById(id);
    await alertConfig.destroy();
  }

  // This would be expanded with actual notification sending logic
  // such as email, SMS, or push notifications
  async sendTestNotification(alertConfigId: number): Promise<{ success: boolean; message: string }> {
    const alertConfig = await this.findAlertConfigById(alertConfigId);
    
    // In a real implementation, this would:
    // 1. Format the notification based on alert config
    // 2. Send notifications to recipients via appropriate channels
    // 3. Log the notification in the database
    // 4. Return results
    
    return {
      success: true,
      message: `Test notification sent for alert configuration '${alertConfig.name}' to ${alertConfig.recipients.length} recipients`,
    };
  }
}