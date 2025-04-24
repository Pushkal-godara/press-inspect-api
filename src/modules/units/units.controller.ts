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
  import { UnitsService } from './units.service';
  import { CreateUnitDto } from './dto/create-unit.dto';
  import { UpdateUnitDto } from './dto/update-unit.dto';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
  
  @Controller('units')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  export class UnitsController {
    constructor(private readonly unitsService: UnitsService) {}
  
    @Post()
    @RequirePermissions('models:create')  // Using models permission for simplicity
    create(@Body() createUnitDto: CreateUnitDto) {
      return this.unitsService.create(createUnitDto);
    }
  
    @Get()
    @RequirePermissions('models:read')  // Using models permission for simplicity
    findAll() {
      return this.unitsService.findAll();
    }
  
    @Get(':id')
    @RequirePermissions('models:read')  // Using models permission for simplicity
    findOne(@Param('id') id: string) {
      return this.unitsService.findById(id);
    }
  
    @Patch(':id')
    @RequirePermissions('models:update')  // Using models permission for simplicity
    update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
      return this.unitsService.update(id, updateUnitDto);
    }
  
    @Delete(':id')
    @RequirePermissions('models:delete')  // Using models permission for simplicity
    remove(@Param('id') id: string) {
      return this.unitsService.remove(id);
    }
  }