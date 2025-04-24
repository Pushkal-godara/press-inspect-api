import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    // Check if email or username already exists
    const existingUser = await this.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(registerDto.password);

    // Create user
    const user = await this.userModel.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.findById(user.id);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      include: [
        {
          model: Role,
          through: { attributes: [] },
        }
      ],
      attributes: { exclude: ['password'] },
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          through: { attributes: [] },
        }
      ],
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    // If updating password, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    await user.update(updateUserDto);

    return this.findById(id);
  }

  async findByIdWithRolesAndPermissions(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          through: { attributes: [] },
          include: [
            {
              model: Permission,
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await user.destroy();
  }

  async addRole(id: number, addRoleDto: AddRoleDto): Promise<User> {
    const user = await this.findById(id);
    const role = await this.roleModel.findByPk(addRoleDto.roleId);
    
    if (!role) {
      throw new NotFoundException(`Role with ID ${addRoleDto.roleId} not found`);
    }
    
    await user.$add('roles', role);
    
    return this.findByIdWithRolesAndPermissions(id);
  }

  async removeRole(id: number, roleId: string): Promise<User> {
    const user = await this.findById(id);
    const role = await this.roleModel.findByPk(roleId);
    
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    
    await user.$remove('roles', role);
    
    return this.findByIdWithRolesAndPermissions(id);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}