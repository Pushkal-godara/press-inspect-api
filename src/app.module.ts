import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/roles/roles.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { InspectionModule } from './modules/inspection/inspection.module';
import { NotificationModule } from './modules/permissions/permissions.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeConfig,
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    EquipmentModule,
    InspectionModule,
    NotificationModule,
  ],
})
export class AppModule {}
