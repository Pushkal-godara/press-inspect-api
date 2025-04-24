import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointsController } from './checkpoints.controller';
import { Checkpoint } from './entities/checkpoint.entity';
import { Unit } from '../units/entities/unit.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Checkpoint, Unit]),
  ],
  providers: [CheckpointsService],
  controllers: [CheckpointsController],
  exports: [CheckpointsService],
})
export class CheckpointsModule {}