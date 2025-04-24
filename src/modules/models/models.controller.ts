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
  import { ModelsService } from './models.service';
  import { CreateModelDto } from './dto/create-model.dto';
  import { UpdateModelDto } from './dto/update-model.dto';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
  
  @Controller('models')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  export class ModelsController {
    constructor(private readonly modelsService: ModelsService) {}
  
    @Post()
    @RequirePermissions('models:create')
    create(@Body() createModelDto: CreateModelDto) {
      return this.modelsService.create(createModelDto);
    }
  
    @Get()
    @RequirePermissions('models:read')
    findAll() {
      return this.modelsService.findAll();
    }
  
    @Get(':id')
    @RequirePermissions('models:read')
    findOne(@Param('id') id: string) {
      return this.modelsService.findById(id);
    }
  
    @Get('group/:groupId')
    @RequirePermissions('models:read')
    findByGroup(@Param('groupId') groupId: string) {
      return this.modelsService.findByGroupId(groupId);
    }
  
    @Patch(':id')
    @RequirePermissions('models:update')
    update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
      return this.modelsService.update(id, updateModelDto);
    }
  
    @Delete(':id')
    @RequirePermissions('models:delete')
    remove(@Param('id') id: string) {
      return this.modelsService.remove(id);
    }
  }