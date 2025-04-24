import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { Unit } from './entities/unit.entity';
import { Checkpoint } from '../checkpoints/entities/checkpoint.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Unit, Checkpoint]),
  ],
  providers: [UnitsService],
  controllers: [UnitsController],
  exports: [UnitsService],
})
export class UnitsModule {}