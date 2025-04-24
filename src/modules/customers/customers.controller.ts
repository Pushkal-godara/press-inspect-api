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
  import { CustomersService } from './customers.service';
  import { CreateCustomerDto } from './dto/create-customer.dto';
  import { UpdateCustomerDto } from './dto/update-customer.dto';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
  
  @Controller('customers')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}
  
    @Post()
    @RequirePermissions('reports:create')  // Using reports permission for simplicity
    create(@Body() createCustomerDto: CreateCustomerDto) {
      return this.customersService.create(createCustomerDto);
    }
  
    @Get()
    @RequirePermissions('reports:read')  // Using reports permission for simplicity
    findAll() {
      return this.customersService.findAll();
    }
  
    @Get(':id')
    @RequirePermissions('reports:read')  // Using reports permission for simplicity
    findOne(@Param('id') id: string) {
      return this.customersService.findById(id);
    }
  
    @Patch(':id')
    @RequirePermissions('reports:update')  // Using reports permission for simplicity
    update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
      return this.customersService.update(id, updateCustomerDto);
    }
  
    @Delete(':id')
    @RequirePermissions('reports:delete')  // Using reports permission for simplicity
    remove(@Param('id') id: string) {
      return this.customersService.remove(id);
    }
  }
  