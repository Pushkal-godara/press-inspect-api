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
  import { GroupsService } from './groups.service';
  import { CreateGroupDto } from './dto/create-group.dto';
  import { UpdateGroupDto } from './dto/update-group.dto';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Groups')
  @Controller('groups')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}
  
    @Post()
    @RequirePermissions('groups:create')
    create(@Body() createGroupDto: CreateGroupDto) {
      return this.groupsService.create(createGroupDto);
    }
  
    @Get()
    @RequirePermissions('groups:read')
    findAll() {
      return this.groupsService.findAll();
    }
  
    @Get(':id')
    @RequirePermissions('groups:read')
    findOne(@Param('id') id: string) {
      return this.groupsService.findById(id);
    }
  
    @Patch(':id')
    @RequirePermissions('groups:update')
    update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
      return this.groupsService.update(id, updateGroupDto);
    }
  
    @Delete(':id')
    @RequirePermissions('groups:delete')
    remove(@Param('id') id: string) {
      return this.groupsService.remove(id);
    }
  }