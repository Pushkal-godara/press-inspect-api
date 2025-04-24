import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Year } from './entities/year.entity';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';

@Injectable()
export class YearsService {
  constructor(
    @InjectModel(Year)
    private yearModel: typeof Year,
  ) {}

  async findAll(): Promise<Year[]> {
    return this.yearModel.findAll();
  }

  async findById(id: string): Promise<Year> {
    const year = await this.yearModel.findByPk(id);
    
    if (!year) {
      throw new NotFoundException(`Year with ID ${id} not found`);
    }
    
    return year;
  }

  async create(createYearDto: CreateYearDto): Promise<Year> {
    return this.yearModel.create(createYearDto as any);
  }

  async update(id: string, updateYearDto: UpdateYearDto): Promise<Year> {
    const year = await this.findById(id);
    
    await year.update(updateYearDto);
    
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const year = await this.findById(id);
    await year.destroy();
  }
}