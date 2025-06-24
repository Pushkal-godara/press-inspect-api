import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { RequirePermissions } from '../../core/decorators/permission.decorator';
@ApiTags('Permissions')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // @Post()
  // @RequirePermissions('permissions:create')
  // create(@Body() createPermissionDto: CreatePermissionDto) {
  //   return this.permissionsService.create(createPermissionDto);
  // }

  @ApiOperation({ summary: 'Get all permissions' })
  @Get()
  findAll(@Req() request) {
    const currentUser = request.user;
    return this.permissionsService.findAll(currentUser);
  }

  // @Get(':id')
  // @RequirePermissions('permissions:read')
  // findOne(@Param('id') id: string) {
  //   return this.permissionsService.findById(id);
  // }

  // @Patch(':id')
  // @RequirePermissions('permissions:update')
  // update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
  //   return this.permissionsService.update(id, updatePermissionDto);
  // }

  // @Delete(':id')
  // @RequirePermissions('permissions:delete')
  // remove(@Param('id') id: string) {
  //   return this.permissionsService.remove(id);
  // }
}