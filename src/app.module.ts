import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { GroupsModule } from './modules/groups/groups.module';
import { ModelsModule } from './modules/models/models.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ReportsModule } from './modules/report/reports.module';
import { RolesModule } from './modules/roles/roles.module';
import { UnitsModule } from './modules/units/units.module';
import { UserModule } from './modules/user/user.module';
import { CountryModule } from './modules/country/country.module';

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
    RolesModule,
    PermissionsModule,
    GroupsModule,
    ModelsModule,
    UnitsModule,
    CustomersModule,
    ReportsModule,
    CountryModule,
  ],
})
export class AppModule {}
