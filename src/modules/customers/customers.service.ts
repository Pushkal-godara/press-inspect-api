import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.customerModel.findByPk(id);
    
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerModel.create(createCustomerDto as any);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findById(id);
    
    await customer.update(updateCustomerDto);
    
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findById(id);
    await customer.destroy();
  }
}
