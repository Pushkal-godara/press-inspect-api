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
  import { YearsService } from './years.service';
  import { CreateYearDto } from './dto/create-year.dto';
  import { UpdateYearDto } from './dto/update-year.dto';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Years')
  @Controller('years')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  export class YearsController {
    constructor(private readonly yearsService: YearsService) {}
  
    @Post()
    @RequirePermissions('models:create')  // Using models permission for simplicity
    create(@Body() createYearDto: CreateYearDto) {
      return this.yearsService.create(createYearDto);
    }
  
    @Get()
    @RequirePermissions('models:read')  // Using models permission for simplicity
    findAll() {
      return this.yearsService.findAll();
    }
  
    @Get(':id')
    @RequirePermissions('models:read')  // Using models permission for simplicity
    findOne(@Param('id') id: string) {
      return this.yearsService.findById(id);
    }
  
    @Patch(':id')
    @RequirePermissions('models:update')  // Using models permission for simplicity
    update(@Param('id') id: string, @Body() updateYearDto: UpdateYearDto) {
      return this.yearsService.update(id, updateYearDto);
    }
  
    @Delete(':id')
    @RequirePermissions('models:delete')  // Using models permission for simplicity
    remove(@Param('id') id: string) {
      return this.yearsService.remove(id);
    }
  }