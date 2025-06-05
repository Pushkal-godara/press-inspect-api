import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country-dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { Roles } from 'src/core/decorators/public.decorator';
import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/core/guards/roles.guard';

@ApiTags('Country')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  @RequirePermissions('users:create')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new user' })
  @Post('create')
  create(@Body() createCountryDto: CreateCountryDto, @Req() req) {
    const currentUser = req.user;
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.countryService.create(createCountryDto, currentUser);
  }

  @RequirePermissions('users:read')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all users' })
  @Get('findAll')
  findAll(@Req() req) {
    const currentUser = req.user;
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.countryService.findAll(currentUser);
  }
}