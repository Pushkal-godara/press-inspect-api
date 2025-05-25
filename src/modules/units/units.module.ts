import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { Unit } from './entities/unit.entity';
import { Checkpoint } from '../checkpoints/entities/checkpoint.entity';
import { UserModule } from '../user/user.module';
import { CoatingSystemUnit } from './entities/coating-system-unit.entity';
import { ThingsToCheckUnits } from './entities/m-unit-things-to-check.entity';
import { SubUnitTxn } from './entities/sub-unit-txns.entity';
import { SubUnit } from './entities/sub-unit.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Unit, Checkpoint, CoatingSystemUnit, ThingsToCheckUnits, SubUnitTxn, SubUnit]),
    forwardRef(() => UserModule),
  ],
  providers: [UnitsService],
  controllers: [UnitsController],
  exports: [UnitsService],
})
export class UnitsModule {}