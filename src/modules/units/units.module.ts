import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { Unit } from './entities/unit.entity';
import { UserModule } from '../user/user.module';
import { CoatingSystemUnit } from './entities/m-coating-system-unit.entity';
import { ThingsToCheckUnits } from './entities/m-unit-things-to-check.entity';
import { SubUnitTxn } from './entities/sub-unit-txns.entity';
import { SubUnit } from './entities/sub-unit.entity';
import { CoatingSystemTxn } from './entities/coating-system-txn.entity';
import { Comments } from './entities/comments.entity';
import { DeliveryTypeCategory } from './entities/delivery-type-category.entity';
import { DeliveryType } from './entities/m-delivery-type.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Unit, 
      CoatingSystemUnit, 
      ThingsToCheckUnits, 
      SubUnitTxn, 
      SubUnit,
      CoatingSystemTxn,
      Comments,
      DeliveryTypeCategory,
      CoatingSystemUnit,
      DeliveryType
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [UnitsService],
  controllers: [UnitsController],
  exports: [UnitsService],
})
export class UnitsModule {}