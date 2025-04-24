import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Unit } from './entities/unit.entity';
import { Checkpoint } from '../checkpoints/entities/checkpoint.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectModel(Unit)
    private unitModel: typeof Unit,
  ) {}

  async findAll(): Promise<Unit[]> {
    return this.unitModel.findAll();
  }

  async findById(id: string): Promise<Unit> {
    const unit = await this.unitModel.findByPk(id, {
      include: [Checkpoint],
    });
    
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
    
    return unit;
  }

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    return this.unitModel.create(createUnitDto as any);
  }

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    const unit = await this.findById(id);
    
    await unit.update(updateUnitDto);
    
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const unit = await this.findById(id);
    await unit.destroy();
  }
}