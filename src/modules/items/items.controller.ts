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
  import { ItemsService } from './items.service';
  import { CreateItemDto } from './dto/create-item.dto';
  import { UpdateItemDto } from './dto/update-item.dto';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Items')
  @Controller('items')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}
  
    // @Post()
    // @RequirePermissions('items:create')
    // create(@Body() createItemDto: CreateItemDto) {
    //   return this.itemsService.create(createItemDto);
    // }
  
    // @Get()
    // @RequirePermissions('items:read')
    // findAll() {
    //   return this.itemsService.findAll();
    // }
  
    // @Get(':id')
    // @RequirePermissions('items:read')
    // findOne(@Param('id') id: string) {
    //   return this.itemsService.findById(id);
    // }
  
    // @Get('model/:modelId')
    // @RequirePermissions('items:read')
    // findByModel(@Param('modelId') modelId: string) {
    //   return this.itemsService.findByModelId(modelId);
    // }
  
    // @Patch(':id')
    // @RequirePermissions('items:update')
    // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    //   return this.itemsService.update(id, updateItemDto);
    // }
  
    // @Delete(':id')
    // @RequirePermissions('items:delete')
    // remove(@Param('id') id: string) {
    //   return this.itemsService.remove(id);
    // }
  }