import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointsController } from './checkpoints.controller';
import { Checkpoint } from './entities/checkpoint.entity';
import { Unit } from '../units/entities/unit.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Checkpoint, Unit]),
    forwardRef(() => UserModule),
  ],
  providers: [CheckpointsService],
  controllers: [CheckpointsController],
  exports: [CheckpointsService],
})
export class CheckpointsModule {}