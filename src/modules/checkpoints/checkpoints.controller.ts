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
  import { CheckpointsService } from './checkpoints.service';
  import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
  import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
  
  @Controller('checkpoints')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  export class CheckpointsController {
    constructor(private readonly checkpointsService: CheckpointsService) {}
  
    @Post()
    @RequirePermissions('models:create')  // Using models permission for simplicity
    create(@Body() createCheckpointDto: CreateCheckpointDto) {
      return this.checkpointsService.create(createCheckpointDto);
    }
  
    @Get()
    @RequirePermissions('models:read')  // Using models permission for simplicity
    findAll() {
      return this.checkpointsService.findAll();
    }
  
    @Get(':id')
    @RequirePermissions('models:read')  // Using models permission for simplicity
    findOne(@Param('id') id: string) {
      return this.checkpointsService.findById(id);
    }
  
    @Get('unit/:unitId')
    @RequirePermissions('models:read')  // Using models permission for simplicity
    findByUnit(@Param('unitId') unitId: string) {
      return this.checkpointsService.findByUnitId(unitId);
    }
  
    @Patch(':id')
    @RequirePermissions('models:update')  // Using models permission for simplicity
    update(@Param('id') id: string, @Body() updateCheckpointDto: UpdateCheckpointDto) {
      return this.checkpointsService.update(id, updateCheckpointDto);
    }
  
    @Delete(':id')
    @RequirePermissions('models:delete')  // Using models permission for simplicity
    remove(@Param('id') id: string) {
      return this.checkpointsService.remove(id);
    }
  }