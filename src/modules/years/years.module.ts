import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { YearsService } from './years.service';
import { YearsController } from './years.controller';
import { Year } from './entities/year.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Year]),
  ],
  providers: [YearsService],
  controllers: [YearsController],
  exports: [YearsService],
})
export class YearsModule {}