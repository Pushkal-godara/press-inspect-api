import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { ModelEntity } from './entities/model.entity';
import { Group } from '../groups/entities/group.entity';
import { Item } from '../items/entities/item.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ModelEntity, Group, Item]),
  ],
  providers: [ModelsService],
  controllers: [ModelsController],
  exports: [ModelsService],
})
export class ModelsModule {}