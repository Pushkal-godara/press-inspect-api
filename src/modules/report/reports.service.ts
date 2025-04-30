import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';
import { ReportDetail } from './entities/report-detail.entity';
import { User } from '../user/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Group } from '../groups/entities/group.entity';
import { ModelEntity } from '../models/entities/model.entity';
import { Item } from '../items/entities/item.entity';
import { Year } from '../years/entities/year.entity';
import { Checkpoint } from '../checkpoints/entities/checkpoint.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { CreateReportDetailDto } from './dto/create-report-detail.dto';
import { UpdateReportDetailDto } from './dto/update-report-detail.dto';
import { Op } from 'sequelize';
import { Unit } from '../units/entities/unit.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report)
    private reportModel: typeof Report,
    @InjectModel(ReportDetail)
    private reportDetailModel: typeof ReportDetail,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Customer)
    private customerModel: typeof Customer,
    @InjectModel(Group)
    private groupModel: typeof Group,
    @InjectModel(ModelEntity)
    private modelModel: typeof ModelEntity,
    @InjectModel(Item)
    private itemModel: typeof Item,
    @InjectModel(Year)
    private yearModel: typeof Year,
    @InjectModel(Checkpoint)
    private checkpointModel: typeof Checkpoint,
  ) { }

  async findAll(filters?: any): Promise<Report[]> {
    let whereClause = {};

    // Apply filters if provided
    if (filters) {
      if (filters.inspectorId) {
        whereClause['inspectorId'] = filters.inspectorId;
      }

      if (filters.customerId) {
        whereClause['customerId'] = filters.customerId;
      }

      if (filters.groupId) {
        whereClause['groupId'] = filters.groupId;
      }

      if (filters.modelId) {
        whereClause['modelId'] = filters.modelId;
      }

      if (filters.itemId) {
        whereClause['itemId'] = filters.itemId;
      }

      if (filters.status) {
        whereClause['status'] = filters.status;
      }

      if (filters.startDate && filters.endDate) {
        whereClause['inspectionDate'] = {
          [Op.between]: [filters.startDate, filters.endDate],
        };
      }
    }

    return this.reportModel.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'inspector' },
        { model: Customer },
        { model: Group },
        { model: ModelEntity, as: 'model' },
        { model: Item },
        { model: Year },
      ],
      order: [['inspectionDate', 'DESC']],
    });
  }

  async findById(id: number): Promise<Report> {
    const report = await this.reportModel.findByPk(id, {
      include: [
        { model: User, as: 'inspector' },
        { model: Customer },
        { model: Group },
        { model: ModelEntity, as: 'model' },
        { model: Item },
        { model: Year },
        {
          model: ReportDetail,
          include: [{ model: Checkpoint, include: [{ model: Unit }] }]
        },
      ],
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async create(createReportDto: CreateReportDto): Promise<Report> {
    // Validate all foreign keys
    await this.validateReportEntities(createReportDto);

    // Create the report
    const report = await this.reportModel.create(createReportDto as any);

    return this.findById(report.id);
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findById(id);

    // Validate foreign keys if they're being updated
    if (updateReportDto.customerId ||
      updateReportDto.inspectorId ||
      updateReportDto.groupId ||
      updateReportDto.modelId ||
      updateReportDto.itemId ||
      updateReportDto.yearId) {
      await this.validateReportEntities({
        ...report.toJSON(),
        ...updateReportDto,
      });
    }

    await report.update(updateReportDto);

    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const report = await this.findById(id);

    // First remove all related report details
    await this.reportDetailModel.destroy({
      where: { reportId: id }
    });

    // Then remove the report
    await report.destroy();
  }

  async addDetail(reportId: number, createReportDetailDto: CreateReportDetailDto): Promise<ReportDetail> {
    const report = await this.findById(reportId);

    // Check if checkpoint exists
    const checkpoint = await this.checkpointModel.findByPk(createReportDetailDto.checkpointId);
    if (!checkpoint) {
      throw new NotFoundException(`Checkpoint with ID ${createReportDetailDto.checkpointId} not found`);
    }

    // Create the report detail
    const reportDetail = await this.reportDetailModel.create({
      ...createReportDetailDto,
      reportId,
    } as any);

    // Update the report's score based on all details
    await this.updateReportScore(reportId);

    return reportDetail;
  }

  async updateDetail(reportId: number, detailId: string, updateReportDetailDto: UpdateReportDetailDto): Promise<ReportDetail> {
    const reportDetail = await this.reportDetailModel.findOne({
      where: { id: detailId, reportId },
    });

    if (!reportDetail) {
      throw new NotFoundException(`Report detail with ID ${detailId} not found for report ${reportId}`);
    }

    // If changing checkpoint, validate it exists
    if (updateReportDetailDto.checkpointId) {
      const checkpoint = await this.checkpointModel.findByPk(updateReportDetailDto.checkpointId);
      if (!checkpoint) {
        throw new NotFoundException(`Checkpoint with ID ${updateReportDetailDto.checkpointId} not found`);
      }
    }

    await reportDetail.update(updateReportDetailDto);

    // Update the report's score
    await this.updateReportScore(reportId);

    return reportDetail;
  }

  async removeDetail(reportId: number, detailId: string): Promise<void> {
    const reportDetail = await this.reportDetailModel.findOne({
      where: { id: detailId, reportId },
    });

    if (!reportDetail) {
      throw new NotFoundException(`Report detail with ID ${detailId} not found for report ${reportId}`);
    }

    await reportDetail.destroy();

    // Update the report's score
    await this.updateReportScore(reportId);
  }

  async exportReport(id: number): Promise<any> {
    const report = await this.findById(id);

    // For now, just return the full report with all related data
    // In a real implementation, you would format this for PDF/Excel export
    return report;
  }

  private async validateReportEntities(reportData: any): Promise<void> {
    // Check if customer exists
    if (reportData.customerId) {
      const customer = await this.customerModel.findByPk(reportData.customerId);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${reportData.customerId} not found`);
      }
    }

    // Check if inspector (user) exists
    if (reportData.inspectorId) {
      const inspector = await this.userModel.findByPk(reportData.inspectorId);
      if (!inspector) {
        throw new NotFoundException(`Inspector with ID ${reportData.inspectorId} not found`);
      }
    }

    // Check if group exists
    if (reportData.groupId) {
      const group = await this.groupModel.findByPk(reportData.groupId);
      if (!group) {
        throw new NotFoundException(`Group with ID ${reportData.groupId} not found`);
      }
    }

    // Check if model exists
    if (reportData.modelId) {
      const model = await this.modelModel.findByPk(reportData.modelId);
      if (!model) {
        throw new NotFoundException(`Model with ID ${reportData.modelId} not found`);
      }
    }

    // Check if item exists
    if (reportData.itemId) {
      const item = await this.itemModel.findByPk(reportData.itemId);
      if (!item) {
        throw new NotFoundException(`Item with ID ${reportData.itemId} not found`);
      }
    }

    // Check if year exists
    if (reportData.yearId) {
      const year = await this.yearModel.findByPk(reportData.yearId);
      if (!year) {
        throw new NotFoundException(`Year with ID ${reportData.yearId} not found`);
      }
    }
  }

  private async updateReportScore(reportId: number): Promise<void> {
    // Get all details for this report
    const details = await this.reportDetailModel.findAll({
      where: { reportId },
    });

    if (details.length === 0) {
      // No details, set score to null
      await this.reportModel.update({
        overallScore: null,
        status: null,
      }, {
        where: { id: reportId },
      });
      return;
    }

    // Calculate score based on ratings
    let totalScore = 0;
    let totalCheckpoints = details.length;

    for (const detail of details) {
      switch (detail.rating) {
        case 'Excellent':
          totalScore += 1;
          break;
        case 'Good':
          totalScore += 0.8;
          break;
        case 'Average':
          totalScore += 0.6;
          break;
        case 'Bad':
          totalScore += 0.3;
          break;
      }
    }

    const overallScore = (totalScore / totalCheckpoints) * 100;

    // Determine status based on score
    let status: string;
    if (overallScore > 90) {
      status = 'Excellent';
    } else if (overallScore >= 80 && overallScore <= 90) {
      status = 'Excellent';
    } else if (overallScore >= 65 && overallScore < 80) {
      status = 'Good';
    } else if (overallScore >= 50 && overallScore < 65) {
      status = 'Average';
    } else {
      status = 'Bad';
    }

    // Update the report
    await this.reportModel.update({
      overallScore,
      status,
    }, {
      where: { id: reportId },
    });
  }
}