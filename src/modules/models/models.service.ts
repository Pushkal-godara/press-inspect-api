import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ModelEntity } from './entities/model.entity';
import { Buyer } from '../report/entities/buyer.entity';
import { Seller } from '../report/entities/seller.entity';
import { Group } from '../groups/entities/group.entity';
import { TechnicalSpecification } from './entities/tech-specification.entity';

import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { UpdateTechSpecificationDto } from './dto/update-tech-specification.dto';
import { CreateTechSpecificationDto } from './dto/create-tech-specification.dto';

@Injectable()
export class ModelsService {
  constructor(
    @InjectModel(ModelEntity)
    private machineModel: typeof ModelEntity,
    @InjectModel(TechnicalSpecification)
    private techSpecModel: typeof TechnicalSpecification,
    @InjectModel(Group)
    private groupModel: typeof Group,
  ) { }

  async createModel(createModelDto: CreateModelDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const machine = await this.machineModel.create({
      ...createModelDto
    });
    return machine;
  }

  async findAll(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const machines = await this.machineModel.findAll({
      include: [
        { model: Group, as: 'group' },
        { model: TechnicalSpecification, as: 'technicalSpecification' },
        { model: Seller, as: 'seller' },
        { model: Buyer, as: 'buyer' },
      ],
    });
    return machines;
  }

  async updateModel(id: number, updateModelDto: UpdateModelDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const machine = await this.machineModel.findByPk(id);
    if (!machine) {
      throw new NotFoundException(`machine with ID ${id} not found`);
    }
    await machine.update(updateModelDto);
    return machine;
  }

  async removeModel(id: number, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const machine = await this.machineModel.findByPk(id);
    if (!machine) {
      throw new NotFoundException(`machine with ID ${id} not found`);
    }
    await machine.destroy();
    return { message: `machine with ID ${id} deleted successfully` };
  }

  async createTechSpecfication(createTechSpecificationDto: CreateTechSpecificationDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const specificationPdf = await this.techSpecModel.create({
      ...createTechSpecificationDto
    });
    return specificationPdf;
  }

  async updateTechSpecfication(id: number, updateTechSpecificationDto: UpdateTechSpecificationDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const specficationPdf = await this.techSpecModel.findOne({ where: { id } });
    if (!specficationPdf) {
      throw new NotFoundException(`specfication with ID ${id} not found`);
    }
    await specficationPdf.update(updateTechSpecificationDto);
    return specficationPdf;
  }

  async getTechSpecficationPdf(id: number, currentUser: any) { // Here id should be model id, so that we can get tech specfication for that model
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const specficationPdf = await this.techSpecModel.findOne({ where: { model_id: id } });
    if (!specficationPdf) {
      throw new NotFoundException(`machine with ID ${id} not found`);
    }
    return specficationPdf;
  }

  async getAllTechSpecficationPdf(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const specficationPdf = await this.techSpecModel.findAll();
    return specficationPdf;
  }
}
