import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './entities/item.entity';
import { ModelEntity } from '../models/entities/model.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
    @InjectModel(ModelEntity)
    private modelModel: typeof ModelEntity,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.findAll({
      include: [ModelEntity],
    });
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemModel.findByPk(id, {
      include: [ModelEntity],
    });
    
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    
    return item;
  }

  async findByModelId(modelId: string): Promise<Item[]> {
    // First check if the model exists
    const model = await this.modelModel.findByPk(modelId);
    
    if (!model) {
      throw new NotFoundException(`Model with ID ${modelId} not found`);
    }
    
    return this.itemModel.findAll({
      where: { modelId },
      include: [ModelEntity],
    });
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    // First check if the model exists
    const model = await this.modelModel.findByPk(createItemDto.modelId);
    
    if (!model) {
      throw new NotFoundException(`Model with ID ${createItemDto.modelId} not found`);
    }
    
    return this.itemModel.create(createItemDto as any);
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findById(id);
    
    // If modelId is being updated, check if the new model exists
    if (updateItemDto.modelId) {
      const model = await this.modelModel.findByPk(updateItemDto.modelId);
      
      if (!model) {
        throw new NotFoundException(`Model with ID ${updateItemDto.modelId} not found`);
      }
    }
    
    await item.update(updateItemDto);
    
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findById(id);
    await item.destroy();
  }
}