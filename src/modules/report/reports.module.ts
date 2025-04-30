import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './entities/report.entity';
import { ReportDetail } from './entities/report-detail.entity';
import { User } from '../user/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Group } from '../groups/entities/group.entity';
import { ModelEntity } from '../models/entities/model.entity';
import { Item } from '../items/entities/item.entity';
import { Year } from '../years/entities/year.entity';
import { Checkpoint } from '../checkpoints/entities/checkpoint.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Report, 
      ReportDetail, 
      User, 
      Customer, 
      Group, 
      ModelEntity, 
      Item, 
      Year,
      Checkpoint
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}