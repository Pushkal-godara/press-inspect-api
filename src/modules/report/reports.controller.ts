import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReportsService } from './reports.service';

import { GeneralInfoDto } from './dto/general-info-txn.dto';
import { GeneralInfoQuestionsDto } from './dto/questions-general-info.dto';
import { CreateBuyerSellerDto } from './dto/create-buyer-seller.dto';
import { UpdateBuyerSellerDto } from './dto/update-buyer-seller.dto';
import { ControlStationDto } from './dto/control-station.dto';
import { ControlStationTxnDto } from './dto/control-station-txn.dto';
import {
  CreateControlStationThingsToCheckDto,
  UpdateControlStationThingsToCheckDto
} from './dto/control-station-things-to-check.dto';
import { ColorMeasuringTxnDto } from './dto/color-measuring-txn.dto';
import { ColorMeasuringDeviceDto } from './dto/color-measuring.dto';
import { CreateReportDto } from './dto/report.dto';

import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { RequirePermissions } from '../../core/decorators/permission.decorator';
import { Roles } from 'src/core/decorators/public.decorator';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { ConditionDto } from './dto/condition.dto';

@ApiTags('Reports')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create')
  createReport(@Body() createReportDto: CreateReportDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createReport(createReportDto, currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('all')
  findAllReports(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllReports(currentUser);
  }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/buyer')
  create(@Body() createBuyerSellerDto: CreateBuyerSellerDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createBuyer(createBuyerSellerDto, currentUser);
  }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/seller')
  createSeller(@Body() createBuyerSellerDto: CreateBuyerSellerDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createSeller(createBuyerSellerDto, currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('all/buyer')
  findAll(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllBuyer(currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('all/seller')
  findAllSeller(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllSeller(currentUser);
  }

  @RequirePermissions('reports:update')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('updateBuyerById/:id')
  updateBuyer(@Param('id') id: string, @Body() updateBuyerSellerDto: UpdateBuyerSellerDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.updateBuyer(+id, updateBuyerSellerDto, currentUser);
  }

  @RequirePermissions('reports:update')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('updateSellerById/:id')
  updateSeller(@Param('id') id: string, @Body() updateBuyerSellerDto: UpdateBuyerSellerDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.updateSeller(+id, updateBuyerSellerDto, currentUser);
  }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/generalInfoQuestion')
  createQuestion(@Body() generalInfoQuestionDto: GeneralInfoQuestionsDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createQuestion(generalInfoQuestionDto, currentUser);
  }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/generalInfoTxn')
  createGeneralInfo(@Body() generalInfoDto: GeneralInfoDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createGeneralInfo(generalInfoDto, currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getAll/questions')
  findAllQuestions(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllQuestions(currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getAll/generalInfoTxn')
  findAllGeneralInfo(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllGeneralInfo(currentUser);
  }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/controlStationTxns')
  createControlStationTxns(@Body() controlStationTxnsDto: ControlStationTxnDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createControlStationTxns(controlStationTxnsDto, currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getAll/controlStationTxns')
  findAllControlStationTxns(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllControlStationTxns(currentUser);
  }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/controlStation')
  createControlStation(@Body() controlStationDto: ControlStationDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createControlStation(controlStationDto, currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getAll/controlStations')
  findAllControlStations(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllControlStations(currentUser);
  }

  @RequirePermissions('reports:update')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('update/controlStation/:id')
  updateControlStation(@Param('id') id: string, @Body() controlStationDto: ControlStationDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.updateControlStation(+id, controlStationDto, currentUser);
  }

  // TODO api to get control stations by id or model id as required

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/controlStationThingsToCheck')
  createControlStationThingsToCheck(@Body() controlStationThingsToCheckDto: CreateControlStationThingsToCheckDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createControlStationThingsToCheck(controlStationThingsToCheckDto, currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getAll/controlStationThingsToCheck')
  findAllControlStationThingsToCheck(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllControlStationThingsToCheck(currentUser);
  }

  @RequirePermissions('reports:update')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('update/controlStationThingsToCheck/:id')
  updateControlStationThingsToCheck(@Param('id') id: string, @Body() controlStationThingsToCheckDto: UpdateControlStationThingsToCheckDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.updateControlStationThingsToCheck(+id, controlStationThingsToCheckDto, currentUser);
  }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/colorMeasurments')
  createColorMeasurments(@Body() colorMeasurmentsDto: ColorMeasuringDeviceDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createColorMeasurments(colorMeasurmentsDto, currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getAll/colorMeasurments')
  findAllColorMeasurments(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllColorMeasurments(currentUser);
  }

  @RequirePermissions('reports:update')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Patch('update/colorMeasuringDevice/:id')
  updateColorMeasurments(@Param('id') id: string, @Body() colorMeasurmentsDto: ColorMeasuringDeviceDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.updateColorMeasurments(+id, colorMeasurmentsDto, currentUser);
  }

  @RequirePermissions('reports:create')
  @Roles('Engineer', 'Admin', 'SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Post('create/colorMeasurmentsTxn')
  createColorMeasuringTxn(@Body() colorMeasuringTxnDto: ColorMeasuringTxnDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createColorMeasuringTxn(colorMeasuringTxnDto, currentUser);
  }

  @RequirePermissions('reports:read')
  @Roles('Engineer', 'Admin', 'SuperAdmin', 'Customer')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get('getAll/colorMeasurmentsTxn')
  findAllColorMeasuringTxn(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllColorMeasuringTxn(currentUser);
  }

  @Get('getAll/conditions')
  findAllConditions(@Req() req) {
    const currentUser = req.user;
    return this.reportsService.findAllConditions(currentUser);
  }

  @Post('create/condition')
  createCondition(@Body() conditionDto: ConditionDto, @Req() req) {
    const currentUser = req.user;
    return this.reportsService.createCondition(conditionDto, currentUser);
  }

}