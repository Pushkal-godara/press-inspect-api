import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { ModelEntity } from '../models/entities/model.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private groupModel: typeof Group,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupModel.findAll();
  }

  async findById(id: string): Promise<Group> {
    const group = await this.groupModel.findByPk(id, {
      include: [ModelEntity],
    });
    
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    
    return group;
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupModel.create(createGroupDto as any);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findById(id);
    
    await group.update(updateGroupDto);
    
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const group = await this.findById(id);
    await group.destroy();
  }
}