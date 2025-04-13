import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
  dialect: configService.get('DB_DIALECT', 'postgres') as any,
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'postgres'),
  database: configService.get('DB_DATABASE', 'press_inspection'),
  autoLoadModels: true,
  synchronize: false,
  logging: configService.get('NODE_ENV') !== 'production',
  define: {
    timestamps: true,
    underscored: true,
  },
});
