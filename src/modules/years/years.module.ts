import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { YearsService } from './years.service';
import { YearsController } from './years.controller';
import { Year } from './entities/year.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Year]),
    forwardRef(() => UserModule),
  ],
  providers: [YearsService],
  controllers: [YearsController],
  exports: [YearsService],
})
export class YearsModule {}