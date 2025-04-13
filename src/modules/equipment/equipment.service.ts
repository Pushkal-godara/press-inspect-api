import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Equipment } from './entities/equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment)
    private equipmentModel: typeof Equipment,
    private companyService: CompanyService,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    // Validate that production line exists
    await this.companyService.findProductionLineById(createEquipmentDto.productionLineId);
    
    return this.equipmentModel.create({ ...createEquipmentDto });
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipmentModel.findAll();
  }

  async findByProductionLineId(production_line_id: number): Promise<Equipment[]> {
    await this.companyService.findProductionLineById(production_line_id);
    
    return this.equipmentModel.findAll({
      where: { production_line_id },
    });
  }

  async findById(id: number): Promise<Equipment> {
    const equipment = await this.equipmentModel.findByPk(id);
    
    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }
    
    return equipment;
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    const equipment = await this.findById(id);
    
    // If production line is being updated, validate it exists
    if (updateEquipmentDto.productionLineId) {
      await this.companyService.findProductionLineById(updateEquipmentDto.productionLineId);
    }
    
    await equipment.update(updateEquipmentDto);
    return equipment;
  }

  async remove(id: number): Promise<void> {
    const equipment = await this.findById(id);
    await equipment.destroy();
  }
}