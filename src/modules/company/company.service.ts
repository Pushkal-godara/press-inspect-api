import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { Plant } from './entities/plant.entity';
import { Department } from './entities/department.entity';
import { ProductionLine } from './entities/production-line.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreatePlantDto } from './dto/create-plant.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { CreateProductionLineDto } from './dto/create-production-line.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
    @InjectModel(Plant)
    private plantModel: typeof Plant,
    @InjectModel(Department)
    private departmentModel: typeof Department,
    @InjectModel(ProductionLine)
    private productionLineModel: typeof ProductionLine,
  ) {}

  // Company methods
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyModel.create({ ...createCompanyDto });
  }

  async findAllCompanies(): Promise<Company[]> {
    return this.companyModel.findAll();
  }

  async findCompanyById(id: number): Promise<Company> {
    const company = await this.companyModel.findByPk(id);
    
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    
    return company;
  }

  async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findCompanyById(id);
    await company.update(updateCompanyDto);
    return company;
  }

  async removeCompany(id: number): Promise<void> {
    const company = await this.findCompanyById(id);
    await company.destroy();
  }

  // Plant methods
  async createPlant(createPlantDto: CreatePlantDto): Promise<Plant> {
    await this.findCompanyById(createPlantDto.companyId);
    return this.plantModel.create({ ...createPlantDto });
  }

  async findAllPlants(): Promise<Plant[]> {
    return this.plantModel.findAll({
      include: [Company],
    });
  }

  async findPlantsByCompanyId(companyId: number): Promise<Plant[]> {
    await this.findCompanyById(companyId);
    return this.plantModel.findAll({
      where: { companyId },
    });
  }

  async findPlantById(id: number): Promise<Plant> {
    const plant = await this.plantModel.findByPk(id, {
      include: [Company],
    });
    
    if (!plant) {
      throw new NotFoundException(`Plant with ID ${id} not found`);
    }
    
    return plant;
  }

  async updatePlant(id: number, updatePlantDto: any): Promise<Plant> {
    const plant = await this.findPlantById(id);
    await plant.update(updatePlantDto);
    return plant;
  }

  async removePlant(id: number): Promise<void> {
    const plant = await this.findPlantById(id);
    await plant.destroy();
  }

  // Department methods
  async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    await this.findPlantById(createDepartmentDto.plantId);
    return this.departmentModel.create({ ...createDepartmentDto });
  }

  async findDepartmentsByPlantId(plantId: number): Promise<Department[]> {
    await this.findPlantById(plantId);
    return this.departmentModel.findAll({
      where: { plantId },
    });
  }

  async findDepartmentById(id: number): Promise<Department> {
    const department = await this.departmentModel.findByPk(id, {
      include: [Plant],
    });
    
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    
    return department;
  }

  async updateDepartment(id: number, updateDepartmentDto: any): Promise<Department> {
    const department = await this.findDepartmentById(id);
    await department.update(updateDepartmentDto);
    return department;
  }

  async removeDepartment(id: number): Promise<void> {
    const department = await this.findDepartmentById(id);
    await department.destroy();
  }

  // Production Line methods
  async createProductionLine(createProductionLineDto: CreateProductionLineDto): Promise<ProductionLine> {
    await this.findDepartmentById(createProductionLineDto.departmentId);
    return this.productionLineModel.create({ ...createProductionLineDto });
  }

  async findProductionLinesByDepartmentId(departmentId: number): Promise<ProductionLine[]> {
    await this.findDepartmentById(departmentId);
    return this.productionLineModel.findAll({
      where: { departmentId },
    });
  }

  async findProductionLineById(id: number): Promise<ProductionLine> {
    const productionLine = await this.productionLineModel.findByPk(id, {
      include: [Department],
    });
    
    if (!productionLine) {
      throw new NotFoundException(`Production Line with ID ${id} not found`);
    }
    
    return productionLine;
  }

  async updateProductionLine(id: number, updateProductionLineDto: any): Promise<ProductionLine> {
    const productionLine = await this.findProductionLineById(id);
    await productionLine.update(updateProductionLineDto);
    return productionLine;
  }

  async removeProductionLine(id: number): Promise<void> {
    const productionLine = await this.findProductionLineById(id);
    await productionLine.destroy();
  }
}