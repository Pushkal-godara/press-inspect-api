import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Unit } from './entities/unit.entity';
import { SubUnit } from './entities/sub-unit.entity';
import { ThingsToCheckUnits } from './entities/m-unit-things-to-check.entity';
import { DeliveryType } from './entities/m-delivery-type.entity';
import { CoatingSystemUnit } from './entities/m-coating-system-unit.entity';
import { DeliveryTypeCategory } from './entities/delivery-type-category.entity';
import { Comments } from './entities/comments.entity';
import { SubUnitTxn } from './entities/sub-unit-txns.entity';
import { CoatingSystemTxn } from './entities/coating-system-txn.entity';

import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { CreateSubUnitDto } from './dto/create-sub-unit.dto';
import { UpdateSubUnitDto } from './dto/update-sub-unit.dto';
import { CreateSubUnitTxnDto } from './dto/sub-unit-txn.dto';
import { CreateThingsToCheckUnitsDto } from './dto/things-to-check-units.dto';
import { CreateDeliveryTypeDto } from './dto/delivery-type.dto';
import { CreateCoatingSystemUnitDto } from './dto/coating-system-unit.dto';
import { CreateDeliveryTypeCategoryDto } from './dto/delivery-type-cat.dto';
import { CreateCommentsDto } from './dto/comments.dto';
import { CreateCoatingSystemTxnDto } from './dto/coating-system-txn.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectModel(Unit)
    private unitModel: typeof Unit,
    @InjectModel(SubUnit)
    private subUnitModel: typeof SubUnit,
    @InjectModel(ThingsToCheckUnits)
    private thingsToCheckUnitsModel: typeof ThingsToCheckUnits,
    @InjectModel(DeliveryType)
    private deliveryTypeModel: typeof DeliveryType,
    @InjectModel(CoatingSystemUnit)
    private coatingSystemUnitModel: typeof CoatingSystemUnit,
    @InjectModel(DeliveryTypeCategory)
    private deliveryTypeCategoryModel: typeof DeliveryTypeCategory,
    @InjectModel(Comments)
    private commentsModel: typeof Comments,
    @InjectModel(SubUnitTxn)
    private subUnitTxnModel: typeof SubUnitTxn,
    @InjectModel(CoatingSystemTxn)
    private coatingSystemTxnModel: typeof CoatingSystemTxn
  ) {}

  async create(createUnitDto: CreateUnitDto, currentUser: any): Promise<Unit> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const unit = await this.unitModel.create({
      ...createUnitDto
    });
    return unit;
  }

  async findAllUnits(currentUser: any): Promise<Unit[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.unitModel.findAll();
  }

  async updateUnit(id: number, updateUnitDto: UpdateUnitDto, currentUser: any): Promise<Unit> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const unit = await this.unitModel.findByPk(id);
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
    await unit.update(updateUnitDto);
    return unit;
  }

  async createSubUnit(createSubUnitDto: CreateSubUnitDto, currentUser: any): Promise<SubUnit> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const subUnit = await this.subUnitModel.create({
      ...createSubUnitDto
    });
    return subUnit;
  }

  async findAllSubUnits(currentUser: any): Promise<SubUnit[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.subUnitModel.findAll({
      include: [
        {
          model: Unit,
          attributes: ['id', 'name'],
        }
      ]
    });
  }

  async updateSubUnit(id: number, updateSubUnitDto: UpdateSubUnitDto, currentUser: any): Promise<SubUnit> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const subUnit = await this.subUnitModel.findByPk(id);
    if (!subUnit) {
      throw new NotFoundException(`SubUnit with ID ${id} not found`);
    }
    await subUnit.update(updateSubUnitDto);
    return subUnit;
  }

  async createSubUnitTxn(createSubUnitTxnDto: CreateSubUnitTxnDto, currentUser: any): Promise<SubUnitTxn> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const subUnit = await this.subUnitTxnModel.create({
      ...createSubUnitTxnDto
    });
    return subUnit;
  }

  async findAllSubUnitTxns(currentUser: any): Promise<SubUnitTxn[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.subUnitTxnModel.findAll();
  }

  // async updateSubUnitTxn(id: number, updateSubUnitTxnDto: UpdateSubUnitTxnDto, currentUser: any): Promise<SubUnit> {
  //   if (!currentUser) {
  //     throw new UnauthorizedException('currentUser not found or token expired');
  //   }
  //   const subUnit = await this.subUnitTxnModel.findByPk(id);
  //   if (!subUnit) {
  //     throw new NotFoundException(`SubUnit with ID ${id} not found`);
  //   }
  //   await subUnitTxnModel.update(updateSubUnitTxnDto);
  //   return subUnit;
  // }

  async createThingsToCheckUnits(createThingsToCheckUnitsDto: CreateThingsToCheckUnitsDto, currentUser: any): Promise<ThingsToCheckUnits> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const thingsToCheck = await this.thingsToCheckUnitsModel.create({
      ...createThingsToCheckUnitsDto
    });
    return thingsToCheck;
  }

  async findAllThingsToCheckUnits(currentUser: any): Promise<ThingsToCheckUnits[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.thingsToCheckUnitsModel.findAll();
  }

  async createCoatingSystemUnits(createCoatingSystemUnitsDto: CreateCoatingSystemUnitDto, currentUser: any): Promise<CoatingSystemUnit> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const coatingSystem = await this.coatingSystemUnitModel.create({
      ...createCoatingSystemUnitsDto
    });
    return coatingSystem;
  }

  async findAllCoatingSystemUnits(currentUser: any): Promise<CoatingSystemUnit[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.coatingSystemUnitModel.findAll();
  }

  async createCoatingSystemTxn(createCoatingSystemTxnDto: CreateCoatingSystemTxnDto, currentUser: any): Promise<CoatingSystemTxn> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const coatingSystem = await this.coatingSystemTxnModel.create({
      ...createCoatingSystemTxnDto
    });
    return coatingSystem;
  }

  async findAllCoatingSystemTxns(currentUser: any): Promise<CoatingSystemTxn[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.coatingSystemTxnModel.findAll();
  }

  async createDeliveryType(createDeliveryTypeDto: CreateDeliveryTypeDto, currentUser: any): Promise<DeliveryType> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const deliveryType = await this.deliveryTypeModel.create({
      ...createDeliveryTypeDto
    });
    return deliveryType;
  }

  async findAllDeliveryTypes(currentUser: any): Promise<DeliveryType[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.deliveryTypeModel.findAll();
  }

  async createDeliveryTypeCategory(createDeliveryTypeCategoryDto: CreateDeliveryTypeCategoryDto, currentUser: any): Promise<DeliveryTypeCategory> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const deliveryTypeCategory = await this.deliveryTypeCategoryModel.create({
      ...createDeliveryTypeCategoryDto
    });
    return deliveryTypeCategory;
  }

  async findAllDeliveryTypeCategories(currentUser: any): Promise<DeliveryTypeCategory[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.deliveryTypeCategoryModel.findAll();
  }

  async createComments(createCommentsDto: CreateCommentsDto, currentUser: any): Promise<Comments> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const comments = await this.commentsModel.create({
      ...createCommentsDto
    });
    return comments;
  }

  async findAllComments(currentUser: any): Promise<Comments[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.commentsModel.findAll();
  }

}