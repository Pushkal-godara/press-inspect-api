import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InspectionService } from './inspection.service';
import { InspectionController } from './inspection.controller';
import { InspectionJob } from './entities/inspection-job.entity';
import { QualityParameter } from './entities/quality-parameter.entity';
import { DefectType } from './entities/defect-type.entity';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([InspectionJob, QualityParameter, DefectType]),
    CompanyModule,
    UserModule,
  ],
  controllers: [InspectionController],
  providers: [InspectionService],
  exports: [InspectionService],
})
export class InspectionModule {}