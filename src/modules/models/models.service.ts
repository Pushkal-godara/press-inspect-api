import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ModelEntity } from './entities/model.entity';
import { Group } from '../groups/entities/group.entity';
import { TechnicalSpecification } from './entities/tech-specification.entity';

import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelsService {
  constructor(
    @InjectModel(ModelEntity)
    private machineModel: typeof ModelEntity,
    @InjectModel(TechnicalSpecification)
    private techSpecModel: typeof TechnicalSpecification,
    @InjectModel(Group)
    private groupModel: typeof Group,
  ) {}

  async createModel(createModelDto: CreateModelDto, currentUser: any) {
      if (!currentUser) {
        throw new UnauthorizedException('currentUser not found or token expired');
      }
      const report = await this.machineModel.create({
        ...createModelDto
      });
      return report;
    }

    async findAll(currentUser: any) {
      if (!currentUser) {
        throw new UnauthorizedException('currentUser not found or token expired');
      }
      const reports = await this.machineModel.findAll();
      return reports;
    }

    async updateModel(id: number, updateModelDto: UpdateModelDto, currentUser: any) {
      if (!currentUser) {
        throw new UnauthorizedException('currentUser not found or token expired');
      }
      const report = await this.machineModel.findByPk(id);
      if (!report) {
        throw new NotFoundException(`Report with ID ${id} not found`);
      }
      await report.update(updateModelDto);
      return report;
    }

    async getTechSpecficationPdf(id: number, currentUser: any) { // Here id should be model id, so that we can get tech specfication for that model
      if (!currentUser) {
        throw new UnauthorizedException('currentUser not found or token expired');
      }
      const report = await this.techSpecModel.findOne({where: {model_id: id}});
      if (!report) {
        throw new NotFoundException(`Report with ID ${id} not found`);
      }
      return report;
    }

    async getAllTechSpecficationPdf(currentUser: any) { 
      if (!currentUser) {
        throw new UnauthorizedException('currentUser not found or token expired');
      }
      const reports = await this.techSpecModel.findAll();
      return reports;
    }
}
