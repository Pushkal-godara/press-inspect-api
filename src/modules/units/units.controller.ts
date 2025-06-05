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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UnitsService } from './units.service';

import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UpdateSubUnitDto } from './dto/update-sub-unit.dto';
import { CreateSubUnitDto } from './dto/create-sub-unit.dto';
import { CreateSubUnitTxnDto } from './dto/sub-unit-txn.dto';
import { CreateThingsToCheckUnitsDto } from './dto/things-to-check-units.dto';
import { CreateDeliveryTypeDto } from './dto/delivery-type.dto';
import { CreateCoatingSystemUnitDto } from './dto/coating-system-unit.dto';
import { CreateDeliveryTypeCategoryDto } from './dto/delivery-type-cat.dto';
import { CreateCommentsDto } from './dto/comments.dto';
import { CreateCoatingSystemTxnDto } from './dto/coating-system-txn.dto';

import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';

import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { Roles } from 'src/core/decorators/public.decorator';
import { Role } from '../roles/entities/role.entity';

@ApiTags('Units')
@ApiTags('Reports')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) { }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/units')
  create(@Body() createUnitDto: CreateUnitDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.create(createUnitDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/units')
  findAll(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllUnits(currentUser);
  }

  @RequirePermissions('units:update')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('update/units/:id')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.updateUnit(+id, updateUnitDto, currentUser);
  }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/sub-units')
  createSubUnit(@Body() createSubUnitDto: CreateSubUnitDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.createSubUnit(createSubUnitDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/sub-units')
  findAllSubUnits(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllSubUnits(currentUser);
  }

  @RequirePermissions('units:update')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('update/sub-units/:id')
  updateSubUnit(@Param('id') id: string, @Body() updateSubUnitDto: UpdateSubUnitDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.updateSubUnit(+id, updateSubUnitDto, currentUser);
  }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/sub-unit-txns')
  createSubUnitTxn(@Body() createSubUnitTxnDto: CreateSubUnitTxnDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.createSubUnitTxn(createSubUnitTxnDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/sub-unit-txns')
  findAllSubUnitTxns(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllSubUnitTxns(currentUser);
  }

  // TODO : Update sub unit txn
  // @RequirePermissions('units:update')
  // @Roles('Engineer')
  // @UseGuards(PermissionGuard, RolesGuard)
  // @Patch('update/sub-unit-txns/:id')
  // updateSubUnitTxn(@Param('id') id: string, @Body() updateSubUnitTxnDto: UpdateSubUnitTxnDto, @Req() req) {
  //   const currentUser = req.user;
  //   return this.unitsService.updateSubUnitTxn(+id, updateSubUnitTxnDto, currentUser);
  // }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/things-to-check-units')
  createThingsToCheckUnits(@Body() createThingsToCheckUnitsDto: CreateThingsToCheckUnitsDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.createThingsToCheckUnits(createThingsToCheckUnitsDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/things-to-check-units')
  findAllThingsToCheckUnits(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllThingsToCheckUnits(currentUser);
  }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/coating-system-units')
  createCoatingSystemUnits(@Body() createCoatingSystemUnitsDto: CreateCoatingSystemUnitDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.createCoatingSystemUnits(createCoatingSystemUnitsDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/coating-system-units')
  findAllCoatingSystemUnits(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllCoatingSystemUnits(currentUser);
  }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/coating-system-txns')
  createCoatingSystemTxn(@Body() createCoatingSystemTxnDto: CreateCoatingSystemTxnDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.createCoatingSystemTxn(createCoatingSystemTxnDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/coating-system-txns')
  findAllCoatingSystemTxns(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllCoatingSystemTxns(currentUser);
  }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/delivery-types')
  createDeliveryType(@Body() createDeliveryTypeDto: CreateDeliveryTypeDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.createDeliveryType(createDeliveryTypeDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/delivery-types')
  findAllDeliveryTypes(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllDeliveryTypes(currentUser);
  }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/delivery-type-categories')
  createDeliveryTypeCategory(@Body() createDeliveryTypeCategoryDto: CreateDeliveryTypeCategoryDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.createDeliveryTypeCategory(createDeliveryTypeCategoryDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/delivery-type-categories')
  findAllDeliveryTypeCategories(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllDeliveryTypeCategories(currentUser);
  }

  @RequirePermissions('units:create')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/comments')
  createComments(@Body() createCommentsDto: CreateCommentsDto, @Req() req) {
    const currentUser = req.user;
    return this.unitsService.createComments(createCommentsDto, currentUser);
  }

  @RequirePermissions('units:read')
  @Roles('Engineer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('read/comments')
  findAllComments(@Req() req) {
    const currentUser = req.user;
    return this.unitsService.findAllComments(currentUser);
  }
}