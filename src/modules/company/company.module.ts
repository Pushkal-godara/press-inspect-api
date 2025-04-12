import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './entities/company.entity';
import { Plant } from './entities/plant.entity';
import { Department } from './entities/department.entity';
import { ProductionLine } from './entities/production-line.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Company, Plant, Department, ProductionLine]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}