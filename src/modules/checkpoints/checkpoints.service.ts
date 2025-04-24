import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Checkpoint } from './entities/checkpoint.entity';
import { Unit } from '../units/entities/unit.entity';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectModel(Checkpoint)
    private checkpointModel: typeof Checkpoint,
    @InjectModel(Unit)
    private unitModel: typeof Unit,
  ) {}

  async findAll(): Promise<Checkpoint[]> {
    return this.checkpointModel.findAll({
      include: [Unit],
    });
  }

  async findById(id: string): Promise<Checkpoint> {
    const checkpoint = await this.checkpointModel.findByPk(id, {
      include: [Unit],
    });
    
    if (!checkpoint) {
      throw new NotFoundException(`Checkpoint with ID ${id} not found`);
    }
    
    return checkpoint;
  }

  async findByUnitId(unitId: string): Promise<Checkpoint[]> {
    // First check if the unit exists
    const unit = await this.unitModel.findByPk(unitId);
    
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${unitId} not found`);
    }
    
    return this.checkpointModel.findAll({
      where: { unitId },
      include: [Unit],
    });
  }

  async create(createCheckpointDto: CreateCheckpointDto): Promise<Checkpoint> {
    // First check if the unit exists
    const unit = await this.unitModel.findByPk(createCheckpointDto.unitId);
    
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${createCheckpointDto.unitId} not found`);
    }
    
    return this.checkpointModel.create(createCheckpointDto as any);
  }

  async update(id: string, updateCheckpointDto: UpdateCheckpointDto): Promise<Checkpoint> {
    const checkpoint = await this.findById(id);
    
    // If unitId is being updated, check if the new unit exists
    if (updateCheckpointDto.unitId) {
      const unit = await this.unitModel.findByPk(updateCheckpointDto.unitId);
      
      if (!unit) {
        throw new NotFoundException(`Unit with ID ${updateCheckpointDto.unitId} not found`);
      }
    }
    
    await checkpoint.update(updateCheckpointDto);
    
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const checkpoint = await this.findById(id);
    await checkpoint.destroy();
  }
}