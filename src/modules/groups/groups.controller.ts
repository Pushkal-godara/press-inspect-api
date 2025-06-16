import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../roles/entities/role.entity';
import { Roles } from 'src/core/decorators/public.decorator';
import { RolesGuard } from 'src/core/guards/roles.guard';

@ApiTags('Groups')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  // @Post()
  // @RequirePermissions('groups:create')
  // create(@Body() createGroupDto: CreateGroupDto) {
  //   return this.groupsService.create(createGroupDto);
  // }

  @RequirePermissions('groups:read')
  @Roles('Admin', 'SuperAdmin', 'Engineer', 'PrePressInspector', 'PressInspector', 'PostPressInspector', 'PackagingInspector')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get()
  findAll(@Req() req) {
    const currentUser = req.user;
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.groupsService.findAll(currentUser);
  }

  @RequirePermissions('groups:create')
  @Roles('Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() req) {
    const currentUser = req.user;
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.groupsService.create(createGroupDto, currentUser);
  }

  // @Get(':id')
  // @RequirePermissions('groups:read')
  // findOne(@Param('id') id: string) {
  //   return this.groupsService.findById(id);
  // }

  // @Patch(':id')
  // @RequirePermissions('groups:update')
  // update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupsService.update(id, updateGroupDto);
  // }

  // @Delete(':id')
  // @RequirePermissions('groups:delete')
  // remove(@Param('id') id: string) {
  //   return this.groupsService.remove(id);
  // }
}