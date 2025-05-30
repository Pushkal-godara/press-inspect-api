import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    UseGuards,
  } from '@nestjs/common';

  import { CountryService } from './country.service';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
  import { ApiTags } from '@nestjs/swagger';

  @ApiTags('Country')
  @Controller('country')
  export class CountryController {
    // constructor(private readonly countryService: CountryService) {}
  
    // @UseGuards(JwtAuthGuard, PermissionGuard)
    // @RequirePermissions('create-country')
    // @Post()
    // create(@Body() createCountryDto: CreateCountryDto) {
    //   return this.countryService.create(createCountryDto);
    // }
  
    // @UseGuards(JwtAuthGuard, PermissionGuard)
    // @RequirePermissions('read-country')
    // @Get()
    // findAll() {
    //   return this.countryService.findAll();
    // }
  }