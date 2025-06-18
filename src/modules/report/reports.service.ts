import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Seller } from './entities/seller.entity';
import { Buyer } from './entities/buyer.entity';
import { ModelEntity } from '../models/entities/model.entity';
import { GeneralInfoTxn } from './entities/general-info-txn.entity';
import { GeneralInfoQuestion } from './entities/m-general-info.entity';
import { ControlStationTxns } from 'src/modules/report/entities/common-entity/control-station-txns.entity';
import { ControlStation } from 'src/modules/report/entities/common-entity/m-control-station.entity';
import { ThingToCheckControlStation } from 'src/modules/report/entities/common-entity/m-things-to-check.entity';
import { ColorMeasurments } from 'src/modules/report/entities/common-entity/m-color-measuring.entity';
import { ColorMeasurementTxns } from 'src/modules/report/entities/common-entity/color-measuring-txns.entity';
import { Report } from './entities/report.entity';
import { Condition } from './entities/common-entity/condition.entity';

import {
  CreateControlStationThingsToCheckDto,
  UpdateControlStationThingsToCheckDto
} from './dto/control-station-things-to-check.dto';
import { CreateReportDto } from './dto/report.dto';
import { CreateBuyerSellerDto } from './dto/create-buyer-seller.dto';
import { UpdateBuyerSellerDto } from './dto/update-buyer-seller.dto';
import { GeneralInfoDto } from './dto/general-info-txn.dto';
import { GeneralInfoQuestionsDto } from './dto/questions-general-info.dto';
import { ControlStationDto } from './dto/control-station.dto';
import { ControlStationTxnDto } from './dto/control-station-txn.dto';
import { ColorMeasuringDeviceDto } from './dto/color-measuring.dto';
import { ColorMeasuringTxnDto } from './dto/color-measuring-txn.dto';
import { ConditionDto } from './dto/condition.dto';


@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Buyer)
    private buyerModel: typeof Buyer,
    @InjectModel(Seller)
    private sellerModel: typeof Seller,
    @InjectModel(GeneralInfoTxn)
    private generalInfoTxnModel: typeof GeneralInfoTxn,
    @InjectModel(GeneralInfoQuestion)
    private generalInfoQuestionModel: typeof GeneralInfoQuestion,
    @InjectModel(ControlStationTxns)
    private controlStationTxnsModel: typeof ControlStationTxns,
    @InjectModel(ControlStation)
    private controlStationModel: typeof ControlStation,
    @InjectModel(ThingToCheckControlStation)
    private thingToCheckControlStationModel: typeof ThingToCheckControlStation,
    @InjectModel(ColorMeasurments)
    private colorMeasurmentsModel: typeof ColorMeasurments,
    @InjectModel(ColorMeasurementTxns)
    private colorMeasurementTxnsModel: typeof ColorMeasurementTxns,
    @InjectModel(Condition)
    private conditionModel: typeof Condition,
    @InjectModel(ModelEntity)
    private machineModel: typeof ModelEntity
  ) { }

  async createReport(createReportDto: CreateReportDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await Report.create({
      ...createReportDto
    });
    return report;
  }

  async findAllReports(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await Report.findAll();
    return reports;
  }

  async createBuyer(createBuyerSellerDto: CreateBuyerSellerDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.buyerModel.create({
      ...createBuyerSellerDto
    });
    return report;
  }

  async createSeller(createBuyerSellerDto: CreateBuyerSellerDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.sellerModel.create({
      ...createBuyerSellerDto
    });
    return report;
  }

  async findAllBuyer(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    // TODO use buyer's id instead of current user id
    const reports = await this.buyerModel.findAll();
    return reports;
  }

  async findAllSeller(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    // TODO use seller's id instead of current user id
    const reports = await this.sellerModel.findAll();
    return reports;
  }

  async updateBuyer(id: number, updateBuyerSellerDto: UpdateBuyerSellerDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.buyerModel.findByPk(id);
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    await report.update(updateBuyerSellerDto);
    return report;
  }

  async updateSeller(id: number, updateBuyerSellerDto: UpdateBuyerSellerDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.sellerModel.findByPk(id);
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    await report.update(updateBuyerSellerDto);
    return report;
  }

  async createQuestion(generalInfoQuestionDto: GeneralInfoQuestionsDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.generalInfoQuestionModel.create({
      ...generalInfoQuestionDto
    });
    return report;
  }

  async createGeneralInfo(generalInfoDto: GeneralInfoDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.generalInfoTxnModel.create({
      ...generalInfoDto
    });
    return report;
  }

  async findAllQuestions(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await this.generalInfoQuestionModel.findAll();
    return reports;
  }

  async findAllGeneralInfo(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await this.generalInfoTxnModel.findAll();
    return reports;
  }


  // TODO get info by id or model id as needed


  async createControlStationTxns(controlStationTxnsDto: ControlStationTxnDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.controlStationTxnsModel.create({
      ...controlStationTxnsDto
    });
    return report;
  }

  async findAllControlStationTxns(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await this.controlStationTxnsModel.findAll({
      include: [{ all: true }]
    });
    return reports;
  }

  async createControlStation(controlStationDto: ControlStationDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.controlStationModel.create({
      ...controlStationDto
    });
    return report;
  }

  async findAllControlStations(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await this.controlStationModel.findAll({
      include: [{ all: true }]
    });
    return reports;
  }

  async updateControlStation(id: number, controlStationDto: ControlStationDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.controlStationModel.findByPk(id);
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    await report.update(controlStationDto);
    return report;
  }

  async createControlStationThingsToCheck(controlStationThingsToCheckDto: CreateControlStationThingsToCheckDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.thingToCheckControlStationModel.create({
      ...controlStationThingsToCheckDto
    });
    return report;
  }

  async findAllControlStationThingsToCheck(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await this.thingToCheckControlStationModel.findAll({
      include: [{ all: true }]
    });
    return reports;
  }

  async updateControlStationThingsToCheck(id: number, controlStationThingsToCheckDto: UpdateControlStationThingsToCheckDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.thingToCheckControlStationModel.findByPk(id);
    if (!report) {
      throw new NotFoundException(`Data with ID ${id} not found`);
    }
    await report.update(controlStationThingsToCheckDto);
    return report;
  }

  async createColorMeasurments(colorMeasurmentsDto: ColorMeasuringDeviceDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.colorMeasurmentsModel.create({
      ...colorMeasurmentsDto
    });
    return report;
  }

  async findAllColorMeasurments(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await this.colorMeasurmentsModel.findAll();
    return reports;
  }

  async updateColorMeasurments(id: number, colorMeasurmentsDto: ColorMeasuringDeviceDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.colorMeasurmentsModel.findByPk(id);
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    await report.update(colorMeasurmentsDto);
    return report;
  }

  async createColorMeasuringTxn(colorMeasuringTxnDto: ColorMeasuringTxnDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.colorMeasurementTxnsModel.create({
      ...colorMeasuringTxnDto
    });
    return report;
  }

  async findAllColorMeasuringTxn(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await this.colorMeasurementTxnsModel.findAll();
    return reports;
  }

  async findAllConditions(currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const reports = await this.conditionModel.findAll();
    return reports;
  }

  async createCondition(conditionDto: ConditionDto, currentUser: any) {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const report = await this.conditionModel.create({
      ...conditionDto
    });
    return report;
  }
}