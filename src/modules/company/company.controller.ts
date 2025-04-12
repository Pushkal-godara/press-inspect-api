import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreatePlantDto } from './dto/create-plant.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { CreateProductionLineDto } from './dto/create-production-line.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@ApiTags('company')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // Company routes
  @Post('companies')
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company successfully created' })
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get('companies')
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'List of companies' })
  findAllCompanies() {
    return this.companyService.findAllCompanies();
  }

  @Get('companies/:id')
  @ApiOperation({ summary: 'Get company by ID' })
  @ApiResponse({ status: 200, description: 'Company found' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  findCompanyById(@Param('id') id: string) {
    return this.companyService.findCompanyById(+id);
  }

  @Patch('companies/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update company by ID' })
  @ApiResponse({ status: 200, description: 'Company successfully updated' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  updateCompany(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }

  @Delete('companies/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete company by ID' })
  @ApiResponse({ status: 200, description: 'Company successfully deleted' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  removeCompany(@Param('id') id: string) {
    return this.companyService.removeCompany(+id);
  }

  // Plant routes
  @Post('plants')
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new plant' })
  @ApiResponse({ status: 201, description: 'Plant successfully created' })
  createPlant(@Body() createPlantDto: CreatePlantDto) {
    return this.companyService.createPlant(createPlantDto);
  }

  @Get('companies/:id/plants')
  @ApiOperation({ summary: 'Get all plants for a company' })
  @ApiResponse({ status: 200, description: 'List of plants' })
  findPlantsByCompanyId(@Param('id') id: string) {
    return this.companyService.findPlantsByCompanyId(+id);
  }

  @Get('plants/:id')
  @ApiOperation({ summary: 'Get plant by ID' })
  @ApiResponse({ status: 200, description: 'Plant found' })
  @ApiResponse({ status: 404, description: 'Plant not found' })
  findPlantById(@Param('id') id: string) {
    return this.companyService.findPlantById(+id);
  }

  @Patch('plants/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update plant by ID' })
  @ApiResponse({ status: 200, description: 'Plant successfully updated' })
  @ApiResponse({ status: 404, description: 'Plant not found' })
  updatePlant(@Param('id') id: string, @Body() updatePlantDto: any) {
    return this.companyService.updatePlant(+id, updatePlantDto);
  }

  @Delete('plants/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete plant by ID' })
  @ApiResponse({ status: 200, description: 'Plant successfully deleted' })
  @ApiResponse({ status: 404, description: 'Plant not found' })
  removePlant(@Param('id') id: string) {
    return this.companyService.removePlant(+id);
  }

  // Department routes
  @Post('departments')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({ status: 201, description: 'Department successfully created' })
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.companyService.createDepartment(createDepartmentDto);
  }

  @Get('plants/:id/departments')
  @ApiOperation({ summary: 'Get all departments for a plant' })
  @ApiResponse({ status: 200, description: 'List of departments' })
  findDepartmentsByPlantId(@Param('id') id: string) {
    return this.companyService.findDepartmentsByPlantId(+id);
  }

  @Get('departments/:id')
  @ApiOperation({ summary: 'Get department by ID' })
  @ApiResponse({ status: 200, description: 'Department found' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  findDepartmentById(@Param('id') id: string) {
    return this.companyService.findDepartmentById(+id);
  }

  @Patch('departments/:id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Update department by ID' })
  @ApiResponse({ status: 200, description: 'Department successfully updated' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  updateDepartment(@Param('id') id: string, @Body() updateDepartmentDto: any) {
    return this.companyService.updateDepartment(+id, updateDepartmentDto);
  }

  @Delete('departments/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete department by ID' })
  @ApiResponse({ status: 200, description: 'Department successfully deleted' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  removeDepartment(@Param('id') id: string) {
    return this.companyService.removeDepartment(+id);
  }

  // Production Line routes
  @Post('production-lines')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Create a new production line' })
  @ApiResponse({ status: 201, description: 'Production line successfully created' })
  createProductionLine(@Body() createProductionLineDto: CreateProductionLineDto) {
    return this.companyService.createProductionLine(createProductionLineDto);
  }

  @Get('departments/:id/production-lines')
  @ApiOperation({ summary: 'Get all production lines for a department' })
  @ApiResponse({ status: 200, description: 'List of production lines' })
  findProductionLinesByDepartmentId(@Param('id') id: string) {
    return this.companyService.findProductionLinesByDepartmentId(+id);
  }

  @Get('production-lines/:id')
  @ApiOperation({ summary: 'Get production line by ID' })
  @ApiResponse({ status: 200, description: 'Production line found' })
  @ApiResponse({ status: 404, description: 'Production line not found' })
  findProductionLineById(@Param('id') id: string) {
    return this.companyService.findProductionLineById(+id);
  }

  @Patch('production-lines/:id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Update production line by ID' })
  @ApiResponse({ status: 200, description: 'Production line successfully updated' })
  @ApiResponse({ status: 404, description: 'Production line not found' })
  updateProductionLine(@Param('id') id: string, @Body() updateProductionLineDto: any) {
    return this.companyService.updateProductionLine(+id, updateProductionLineDto);
  }

  @Delete('production-lines/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete production line by ID' })
  @ApiResponse({ status: 200, description: 'Production line successfully deleted' })
  @ApiResponse({ status: 404, description: 'Production line not found' })
  removeProductionLine(@Param('id') id: string) {
    return this.companyService.removeProductionLine(+id);
  }
}