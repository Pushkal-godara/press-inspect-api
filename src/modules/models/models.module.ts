import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { ModelEntity } from './entities/model.entity';
import { Group } from '../groups/entities/group.entity';
import { UserModule } from '../user/user.module';
import { TechnicalSpecification } from './entities/tech-specification.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([ModelEntity, Group, TechnicalSpecification]),
    forwardRef(() => UserModule),
  ],
  providers: [ModelsService],
  controllers: [ModelsController],
  exports: [ModelsService],
})
export class ModelsModule {}