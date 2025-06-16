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

  async findAll(currentUser: any): Promise<Group[]> {
    if (currentUser.roles.includes('Customer')) {
      throw new NotFoundException('Customer cannot access groups');
    }
    const groups = await this.groupModel.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: ModelEntity,
          attributes: ['name'],
        },
      ],
    })
    
    return groups;
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

  async create(createGroupDto: CreateGroupDto, currentUser: any): Promise<Group> {
    const group = await this.groupModel.create({ ...createGroupDto} );
    // You can add additional logic here if needed
    return group;
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