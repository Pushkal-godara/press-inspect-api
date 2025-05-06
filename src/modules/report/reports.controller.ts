// src/modules/reports/reports.controller.ts
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
  import { ReportsService } from './reports.service';
  import { CreateReportDto } from './dto/create-report.dto';
  import { UpdateReportDto } from './dto/update-report.dto';
  import { CreateReportDetailDto } from './dto/create-report-detail.dto';
  import { UpdateReportDetailDto } from './dto/update-report-detail.dto';
  import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
  import { PermissionGuard } from '../../core/guards/permission.guard';
  import { RequirePermissions } from '../../core/decorators/permission.decorator';
  import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
  
  interface ReportFiltersQuery {
    inspectorId?: string;
    customerId?: string;
    groupId?: string;
    modelId?: string;
    itemId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }
  
  @ApiTags('Reports')
  @Controller('reports')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}
  
    // @Post()
    // @RequirePermissions('reports:create')
    // create(@Body() createReportDto: CreateReportDto) {
    //   return this.reportsService.create(createReportDto);
    // }
  
    // @Get()
    // @RequirePermissions('reports:read')
    // findAll(@Query() filters: ReportFiltersQuery, @Req() req: Request) {
    //   // If no specific inspectorId filter provided and user isn't admin,
    //   // limit to reports created by the current user
    //   if (!filters.inspectorId && !this.isAdmin(req)) {
    //     filters.inspectorId = req.user['id'];
    //   }
      
    //   return this.reportsService.findAll(filters);
    // }
  
    // @Get(':id')
    // @RequirePermissions('reports:read')
    // findOne(@Param('id') id: number) {
    //   return this.reportsService.findById(id);
    // }
  
    // @Patch(':id')
    // @RequirePermissions('reports:update')
    // update(@Param('id') id: number, @Body() updateReportDto: UpdateReportDto) {
    //   return this.reportsService.update(id, updateReportDto);
    // }
  
    // @Delete(':id')
    // @RequirePermissions('reports:delete')
    // remove(@Param('id') id: number) {
    //   return this.reportsService.remove(id);
    // }
  
    // @Post(':id/details')
    // @RequirePermissions('reports:update')
    // addDetail(
    //   @Param('id') id: number, 
    //   @Body() createReportDetailDto: CreateReportDetailDto
    // ) {
    //   return this.reportsService.addDetail(id, createReportDetailDto);
    // }
  
    // @Patch(':id/details/:detailId')
    // @RequirePermissions('reports:update')
    // updateDetail(
    //   @Param('id') id: number, 
    //   @Param('detailId') detailId: string,
    //   @Body() updateReportDetailDto: UpdateReportDetailDto
    // ) {
    //   return this.reportsService.updateDetail(id, detailId, updateReportDetailDto);
    // }
  
    // @Delete(':id/details/:detailId')
    // @RequirePermissions('reports:update')
    // removeDetail(
    //   @Param('id') id: number, 
    //   @Param('detailId') detailId: string
    // ) {
    //   return this.reportsService.removeDetail(id, detailId);
    // }
  
    // @Get(':id/export')
    // @RequirePermissions('reports:export')
    // exportReport(@Param('id') id: number) {
    //   return this.reportsService.exportReport(id);
    // }
  
    // private isAdmin(req: Request): boolean {
    //   return req.user && req.user['roles'] && req.user['roles'].includes('Admin');
    // }
  }