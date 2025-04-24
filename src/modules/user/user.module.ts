import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { RolePermission } from '../roles/entities/role-permission.entity';
import { UserRole } from '../roles/entities/user-role.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, Permission, RolePermission, UserRole]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}