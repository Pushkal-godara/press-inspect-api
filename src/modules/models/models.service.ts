import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelEntity } from './entities/model.entity';
import { Group } from '../groups/entities/group.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelsService {
  constructor(
    @InjectModel(ModelEntity)
    private modelModel: typeof ModelEntity,
    @InjectModel(Group)
    private groupModel: typeof Group,
  ) {}

  async findAll(): Promise<ModelEntity[]> {
    return this.modelModel.findAll({
      include: [Group],
    });
  }

  async findById(id: string): Promise<ModelEntity> {
    const model = await this.modelModel.findByPk(id, {
      include: [Group],
    });
    
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    
    return model;
  }

  async findByGroupId(groupId: string): Promise<ModelEntity[]> {
    // First check if the group exists
    const group = await this.groupModel.findByPk(groupId);
    
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }
    
    return this.modelModel.findAll({
      where: { groupId },
      include: [Group],
    });
  }

  async create(createModelDto: CreateModelDto): Promise<ModelEntity> {
    // First check if the group exists
    const group = await this.groupModel.findByPk(createModelDto.groupId);
    
    if (!group) {
      throw new NotFoundException(`Group with ID ${createModelDto.groupId} not found`);
    }
    
    return this.modelModel.create(createModelDto as any);
  }

  async update(id: string, updateModelDto: UpdateModelDto): Promise<ModelEntity> {
    const model = await this.findById(id);
    
    // If groupId is being updated, check if the new group exists
    if (updateModelDto.groupId) {
      const group = await this.groupModel.findByPk(updateModelDto.groupId);
      
      if (!group) {
        throw new NotFoundException(`Group with ID ${updateModelDto.groupId} not found`);
      }
    }
    
    await model.update(updateModelDto);
    
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const model = await this.findById(id);
    await model.destroy();
  }
}
