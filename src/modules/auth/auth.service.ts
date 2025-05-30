import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return this.excludePassword(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user with roles and permissions
    const userWithRoles = await this.userService.findByIdWithRolesAndPermissions(user.id);
    // Extract permissions from roles
    const permissions = this.extractPermissions(userWithRoles);
    const payload = {
      sub: user.id,
      email: user.email,
      roles: userWithRoles.roles.map(role => role.name),
      permissions,
      country: user.countryId,
    };
    const token = this.jwtService.sign(payload);

    console.log('Generated token payload:', payload);
    console.log('Generated token:', token);
    
    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.firstName,
        email: user.email,
        roles: userWithRoles.roles[0].name,
        registrationId: user.registrationId,
        country: user.countryId
      },
    };
  }

  private excludePassword(user: User) {
    const { password, ...result } = user['dataValues'] || user;
    return result;
  }

  private extractPermissions(user: any): string[] {
    const permissions = new Set<string>();
    
    if (user.roles && user.roles.length) {
      user.roles.forEach(role => {
        if (role.permissions && role.permissions.length) {
          role.permissions.forEach(permission => {
            permissions.add(`${permission.resource}:${permission.action}`);
          });
        }
      });
    }
    
    return Array.from(permissions);
  }
}