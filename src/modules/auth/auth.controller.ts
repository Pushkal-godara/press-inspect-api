import { Controller, Post, Body, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from '../../core/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { PermissionGuard } from 'src/core/guards/permission.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

@ApiTags('Auth')
@ApiBearerAuth('access_token')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @RequirePermissions('users:create')
  // @Roles('SuperAdmin', 'Admin')
  // @UseGuards(JwtAuthGuard, PermissionGuard, RolesGuard)
  // @Post('register')
  // @ApiOperation({ summary: 'User registration' })
  // async register(@Body() registerDto: RegisterDto, @Req() req) {
  //   const currentUser = req.user;
  //   return this.authService.register(registerDto, currentUser);
  // }
}