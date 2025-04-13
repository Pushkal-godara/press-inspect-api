import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommandModule } from 'nestjs-command';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SeedCommand } from './commands/seed.command';
import { InitialDataSeeder } from './seeders/initial-data.seeder';

import { Role } from '../modules/user/entities/role.entity';
import { User } from '../modules/user/entities/user.entity';
import { Permission } from '../modules/user/entities/permission.entity';
import { RolePermission } from '../modules/user/entities/role-permission.entity';
import { Company } from '../modules/company/entities/company.entity';
import { Plant } from '../modules/company/entities/plant.entity';
import { Department } from '../modules/company/entities/department.entity';
import { ProductionLine } from '../modules/company/entities/production-line.entity';
import { Equipment } from '../modules/equipment/entities/equipment.entity';
import { DefectType } from '../modules/inspection/entities/defect-type.entity';
import { QualityParameter } from '../modules/inspection/entities/quality-parameter.entity';
import { InspectionJob } from '../modules/inspection/entities/inspection-job.entity';
import { AlertConfiguration } from '../modules/notification/entities/alert-configuration.entity';

@Module({
  imports: [
    CommandModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DB_DIALECT', 'postgres'),
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'press_inspection'),
        autoLoadModels: true,
        synchronize: true,
        logging: configService.get('NODE_ENV') !== 'production',
        define: {
          timestamps: true,
          underscored: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        },
      }),
    }),
    SequelizeModule.forFeature([
      Role,
      User,
      Permission,
      RolePermission,
      Company,
      Plant,
      Department,
      ProductionLine,
      Equipment,
      DefectType,
      QualityParameter,
      InspectionJob,
      AlertConfiguration
    ]),
  ],
  providers: [SeedCommand, InitialDataSeeder],
})
export class SeedModule {}