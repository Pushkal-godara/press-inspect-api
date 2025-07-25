import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './entities/report.entity';
import { User } from '../user/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Group } from '../groups/entities/group.entity';
import { ModelEntity } from '../models/entities/model.entity';
import { UserModule } from '../user/user.module';
import { ColorMeasurementTxns } from './entities/common-entity/color-measuring-txns.entity';
import { Condition } from './entities/common-entity/condition.entity';
import { ControlStationTxns } from './entities/common-entity/control-station-txns.entity';
import { ColorMeasurments } from './entities/common-entity/m-color-measuring.entity';
import { ControlStation } from './entities/common-entity/m-control-station.entity';
import { ThingToCheckControlStation } from './entities/common-entity/m-things-to-check.entity';
import { Buyer } from './entities/buyer.entity';
import { Seller } from './entities/seller.entity';
import { TechnicalSpecification } from '../models/entities/tech-specification.entity';
import { GeneralInfoTxn } from './entities/general-info-txn.entity';
import { GeneralInfoQuestion } from './entities/m-general-info.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Report, 
      User, 
      Customer, 
      Group, 
      ModelEntity, 
      ColorMeasurementTxns,
      Condition,
      ControlStationTxns,
      ColorMeasurments,
      ControlStation,
      ThingToCheckControlStation,
      Buyer,
      Seller,
      TechnicalSpecification,
      GeneralInfoTxn,
      GeneralInfoQuestion
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}