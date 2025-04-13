import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    
    await this.userService.updateLastLogin(user.id);
    
    return {
      user,
      accessToken: this.generateToken(user),
    };
  }

  generateToken(user: Partial<User>) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role?.name,
      companyId: user.company_id,
    };
    
    return this.jwtService.sign(payload);
  }

  private excludePassword(user: User) {
    const { password, ...result } = user['dataValues'] || user;
    return result;
  }
}