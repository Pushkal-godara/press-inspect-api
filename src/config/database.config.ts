import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config();

const configService = new ConfigService();

const databaseConfig: SequelizeModuleOptions = {
  dialect: configService.get('DB_DIALECT', 'postgres'),
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'postgres'),
  database: configService.get('DB_DATABASE', 'press_inspection'),
  autoLoadModels: true,
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('NODE_ENV') !== 'production',
  models: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  define: {
    timestamps: true,
    underscored: true,
  },
};

export default databaseConfig;