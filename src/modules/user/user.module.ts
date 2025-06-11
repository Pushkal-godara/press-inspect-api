import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

import { UserService } from './user.service';
import { S3Service } from '../../services/s3.service';
import { UserController } from './user.controller';
import { RolesModule } from '../roles/roles.module';

import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { RolePermission } from '../roles/entities/role-permission.entity';
import { UserRole } from '../roles/entities/user-role.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, Permission, RolePermission, UserRole]),
    MulterModule.register(),
    ConfigModule,
    forwardRef(() => RolesModule),
  ],
  controllers: [UserController],
  providers: [UserService, S3Service],
  exports: [UserService, S3Service],
})
export class UserModule {}