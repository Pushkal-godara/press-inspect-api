import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { AlertConfiguration } from './entities/alert-configuration.entity';
import { InspectionModule } from '../inspection/inspection.module';

@Module({
  imports: [
    SequelizeModule.forFeature([AlertConfiguration]),
    InspectionModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}