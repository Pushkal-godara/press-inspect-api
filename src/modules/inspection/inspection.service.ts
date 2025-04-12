import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InspectionJob } from './entities/inspection-job.entity';
import { QualityParameter } from './entities/quality-parameter.entity';
import { DefectType } from './entities/defect-type.entity';
import { CreateInspectionJobDto } from './dto/create-inspection-job.dto';
import { CreateQualityParameterDto } from './dto/create-quality-parameter.dto';
import { CreateDefectTypeDto } from './dto/create-defect-type.dto';
import { CompanyService } from '../company/company.service';
import { UserService } from '../user/user.service';

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(InspectionJob)
    private inspectionJobModel: typeof InspectionJob,
    @InjectModel(QualityParameter)
    private qualityParameterModel: typeof QualityParameter,
    @InjectModel(DefectType)
    private defectTypeModel: typeof DefectType,
    private companyService: CompanyService,
    private userService: UserService,
  ) {}

  // Inspection Job methods
  async createInspectionJob(userId: number, createInspectionJobDto: CreateInspectionJobDto): Promise<InspectionJob> {
    // Validate production line exists
    await this.companyService.findProductionLineById(createInspectionJobDto.productionLineId);
    
    // Validate user exists
    await this.userService.findById(userId);
    
    return this.inspectionJobModel.create({
      ...createInspectionJobDto,
      createdBy: userId,
    });
  }

  async findAllInspectionJobs(): Promise<InspectionJob[]> {
    return this.inspectionJobModel.findAll({
      include: [QualityParameter],
    });
  }

  async findInspectionJobsByProductionLine(productionLineId: number): Promise<InspectionJob[]> {
    await this.companyService.findProductionLineById(productionLineId);
    
    return this.inspectionJobModel.findAll({
      where: { productionLineId },
      include: [QualityParameter],
    });
  }

  async findInspectionJobById(id: number): Promise<InspectionJob> {
    const inspectionJob = await this.inspectionJobModel.findByPk(id, {
      include: [QualityParameter],
    });
    
    if (!inspectionJob) {
      throw new NotFoundException(`Inspection job with ID ${id} not found`);
    }
    
    return inspectionJob;
  }

  async updateInspectionJob(id: number, updateInspectionJobDto: any): Promise<InspectionJob> {
    const inspectionJob = await this.findInspectionJobById(id);
    
    // If production line is being updated, validate it exists
    if (updateInspectionJobDto.productionLineId) {
      await this.companyService.findProductionLineById(updateInspectionJobDto.productionLineId);
    }
    
    await inspectionJob.update(updateInspectionJobDto);
    return this.findInspectionJobById(id);
  }

  async removeInspectionJob(id: number): Promise<void> {
    const inspectionJob = await this.findInspectionJobById(id);
    await inspectionJob.destroy();
  }

  // Quality Parameter methods
  async createQualityParameter(createQualityParameterDto: CreateQualityParameterDto): Promise<QualityParameter> {
    // Validate inspection job exists
    await this.findInspectionJobById(createQualityParameterDto.inspectionJobId);
    
    return this.qualityParameterModel.create({ ...createQualityParameterDto });
  }

  async findQualityParametersByInspectionJob(inspectionJobId: number): Promise<QualityParameter[]> {
    await this.findInspectionJobById(inspectionJobId);
    
    return this.qualityParameterModel.findAll({
      where: { inspectionJobId },
    });
  }

  async findQualityParameterById(id: number): Promise<QualityParameter> {
    const qualityParameter = await this.qualityParameterModel.findByPk(id);
    
    if (!qualityParameter) {
      throw new NotFoundException(`Quality parameter with ID ${id} not found`);
    }
    
    return qualityParameter;
  }

  async updateQualityParameter(id: number, updateQualityParameterDto: any): Promise<QualityParameter> {
    const qualityParameter = await this.findQualityParameterById(id);
    await qualityParameter.update(updateQualityParameterDto);
    return qualityParameter;
  }

  async removeQualityParameter(id: number): Promise<void> {
    const qualityParameter = await this.findQualityParameterById(id);
    await qualityParameter.destroy();
  }

  // Defect Type methods
  async createDefectType(createDefectTypeDto: CreateDefectTypeDto): Promise<DefectType> {
    // Check if defect type with same name already exists
    const existingDefectType = await this.defectTypeModel.findOne({
      where: { name: createDefectTypeDto.name },
    });
    
    if (existingDefectType) {
      throw new ConflictException(`Defect type with name '${createDefectTypeDto.name}' already exists`);
    }
    
    return this.defectTypeModel.create({ ...createDefectTypeDto });
  }

  async findAllDefectTypes(): Promise<DefectType[]> {
    return this.defectTypeModel.findAll();
  }

  async findDefectTypeById(id: number): Promise<DefectType> {
    const defectType = await this.defectTypeModel.findByPk(id);
    
    if (!defectType) {
      throw new NotFoundException(`Defect type with ID ${id} not found`);
    }
    
    return defectType;
  }

  async updateDefectType(id: number, updateDefectTypeDto: any): Promise<DefectType> {
    const defectType = await this.findDefectTypeById(id);
    await defectType.update(updateDefectTypeDto);
    return defectType;
  }

  async removeDefectType(id: number): Promise<void> {
    const defectType = await this.findDefectTypeById(id);
    await defectType.destroy();
  }
}