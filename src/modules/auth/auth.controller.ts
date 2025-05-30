import { Controller, Post, Body, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from '../../core/decorators/public.decorator';

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
}