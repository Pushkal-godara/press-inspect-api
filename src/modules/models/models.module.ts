import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { ModelEntity } from './entities/model.entity';
import { Group } from '../groups/entities/group.entity';
import { UserModule } from '../user/user.module';
import { GeneralInfo } from './entities/m-general-info.entity';
import { GeneralInfoTxn } from './entities/general-info-txn.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ModelEntity, Group, GeneralInfo, GeneralInfoTxn]),
    forwardRef(() => UserModule),
  ],
  providers: [ModelsService],
  controllers: [ModelsController],
  exports: [ModelsService],
})
export class ModelsModule {}