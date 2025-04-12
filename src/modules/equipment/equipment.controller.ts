import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@ApiTags('equipment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Create new equipment' })
  @ApiResponse({ status: 201, description: 'Equipment successfully created' })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all equipment' })
  @ApiResponse({ status: 200, description: 'List of equipment' })
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get('production-line/:id')
  @ApiOperation({ summary: 'Get all equipment for a production line' })
  @ApiResponse({ status: 200, description: 'List of equipment for production line' })
  findByProductionLineId(@Param('id') id: string) {
    return this.equipmentService.findByProductionLineId(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get equipment by ID' })
  @ApiResponse({ status: 200, description: 'Equipment found' })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  findOne(@Param('id') id: string) {
    return this.equipmentService.findById(+id);
  }

  @Patch(':id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Update equipment by ID' })
  @ApiResponse({ status: 200, description: 'Equipment successfully updated' })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete equipment by ID' })
  @ApiResponse({ status: 200, description: 'Equipment successfully deleted' })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }
}