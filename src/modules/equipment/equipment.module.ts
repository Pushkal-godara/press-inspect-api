import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './entities/equipment.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Equipment]),
    CompanyModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}