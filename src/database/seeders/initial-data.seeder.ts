import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { Role } from '../../modules/user/entities/role.entity';
import { User } from '../../modules/user/entities/user.entity';
import { Permission } from '../../modules/user/entities/permission.entity';
import { Company } from '../../modules/company/entities/company.entity';
import { Plant } from '../../modules/company/entities/plant.entity';
import { Department } from '../../modules/company/entities/department.entity';
import { ProductionLine } from '../../modules/company/entities/production-line.entity';
import { Equipment, EquipmentType } from '../../modules/equipment/entities/equipment.entity';
import { DefectType, SeverityLevel } from '../../modules/inspection/entities/defect-type.entity';

@Injectable()
export class InitialDataSeeder {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Permission)
    private permissionModel: typeof Permission,
    @InjectModel(Company)
    private companyModel: typeof Company,
    @InjectModel(Plant)
    private plantModel: typeof Plant,
    @InjectModel(Department)
    private departmentModel: typeof Department,
    @InjectModel(ProductionLine)
    private productionLineModel: typeof ProductionLine,
    @InjectModel(Equipment)
    private equipmentModel: typeof Equipment,
    @InjectModel(DefectType)
    private defectTypeModel: typeof DefectType,
  ) {}

  async seed() {
    console.log('Starting database seeding...');
    // First seed permissions and roles
    const permissions = await this.seedPermissions();
    await this.seedRoles();
    await this.assignPermissionsToRoles(permissions);
    
    // Then seed other entities
    await this.seedCompanies();
    const adminCompany = await this.companyModel.findByPk(1);
    await this.seedUsers(adminCompany);
    await this.seedPlants();
    await this.seedDepartments();
    await this.seedProductionLines();
    await this.seedEquipment();
    await this.seedDefectTypes();
    console.log('Database seeding completed!');
  }

  private async seedPermissions() {
    console.log('Seeding permissions...');
    const permissions = [
      // User permissions
      { name: 'create_user', resource: 'users', action: 'create', description: 'Create users' },
      { name: 'read_user', resource: 'users', action: 'read', description: 'Read user information' },
      { name: 'update_user', resource: 'users', action: 'update', description: 'Update user information' },
      { name: 'delete_user', resource: 'users', action: 'delete', description: 'Delete users' },
      
      // Company permissions
      { name: 'create_company', resource: 'companies', action: 'create', description: 'Create companies' },
      { name: 'read_company', resource: 'companies', action: 'read', description: 'View company information' },
      { name: 'update_company', resource: 'companies', action: 'update', description: 'Update company information' },
      { name: 'delete_company', resource: 'companies', action: 'delete', description: 'Delete companies' },
      
      // Plant permissions
      { name: 'create_plant', resource: 'plants', action: 'create', description: 'Create plants' },
      { name: 'read_plant', resource: 'plants', action: 'read', description: 'View plant information' },
      { name: 'update_plant', resource: 'plants', action: 'update', description: 'Update plant information' },
      { name: 'delete_plant', resource: 'plants', action: 'delete', description: 'Delete plants' },
      
      // Department permissions
      { name: 'create_department', resource: 'departments', action: 'create', description: 'Create departments' },
      { name: 'read_department', resource: 'departments', action: 'read', description: 'View department information' },
      { name: 'update_department', resource: 'departments', action: 'update', description: 'Update department information' },
      { name: 'delete_department', resource: 'departments', action: 'delete', description: 'Delete departments' },
      
      // Production line permissions
      { name: 'create_production_line', resource: 'production_lines', action: 'create', description: 'Create production lines' },
      { name: 'read_production_line', resource: 'production_lines', action: 'read', description: 'View production line information' },
      { name: 'update_production_line', resource: 'production_lines', action: 'update', description: 'Update production line information' },
      { name: 'delete_production_line', resource: 'production_lines', action: 'delete', description: 'Delete production lines' },
      
      // Equipment permissions
      { name: 'create_equipment', resource: 'equipment', action: 'create', description: 'Create equipment' },
      { name: 'read_equipment', resource: 'equipment', action: 'read', description: 'View equipment information' },
      { name: 'update_equipment', resource: 'equipment', action: 'update', description: 'Update equipment information' },
      { name: 'delete_equipment', resource: 'equipment', action: 'delete', description: 'Delete equipment' },
      
      // Inspection permissions
      { name: 'create_inspection', resource: 'inspection', action: 'create', description: 'Create inspection jobs' },
      { name: 'read_inspection', resource: 'inspection', action: 'read', description: 'View inspection information' },
      { name: 'update_inspection', resource: 'inspection', action: 'update', description: 'Update inspection information' },
      { name: 'delete_inspection', resource: 'inspection', action: 'delete', description: 'Delete inspection jobs' },
      
      // Parameter permissions
      { name: 'create_parameter', resource: 'parameters', action: 'create', description: 'Create quality parameters' },
      { name: 'read_parameter', resource: 'parameters', action: 'read', description: 'View quality parameter information' },
      { name: 'update_parameter', resource: 'parameters', action: 'update', description: 'Update quality parameter information' },
      { name: 'delete_parameter', resource: 'parameters', action: 'delete', description: 'Delete quality parameters' },
      
      // Defect type permissions
      { name: 'create_defect_type', resource: 'defect_types', action: 'create', description: 'Create defect types' },
      { name: 'read_defect_type', resource: 'defect_types', action: 'read', description: 'View defect type information' },
      { name: 'update_defect_type', resource: 'defect_types', action: 'update', description: 'Update defect type information' },
      { name: 'delete_defect_type', resource: 'defect_types', action: 'delete', description: 'Delete defect types' },
      
      // Alert permissions
      { name: 'create_alert', resource: 'alerts', action: 'create', description: 'Create alert configurations' },
      { name: 'read_alert', resource: 'alerts', action: 'read', description: 'View alert information' },
      { name: 'update_alert', resource: 'alerts', action: 'update', description: 'Update alert configurations' },
      { name: 'delete_alert', resource: 'alerts', action: 'delete', description: 'Delete alert configurations' },
    ];

    const createdPermissions = [];
    for (const permission of permissions) {
      const [createdPermission] = await this.permissionModel.findOrCreate({
        where: { name: permission.name },
        defaults: permission,
      });
      createdPermissions.push(createdPermission);
    }

    console.log(`Created ${createdPermissions.length} permissions`);
    return createdPermissions;
  }

  private async seedRoles() {
    console.log('Seeding roles...');
    const roles = [
      {
        name: 'admin',
        description: 'Administrator role with full system access',
      },
      {
        name: 'manager',
        description: 'Manager role with access to manage production operations',
      },
      {
        name: 'operator',
        description: 'Operator role with limited access to monitoring equipment',
      },
      {
        name: 'inspector',
        description: 'Quality inspector role with access to inspection data',
      },
    ];

    for (const role of roles) {
      await this.roleModel.findOrCreate({
        where: { name: role.name },
        defaults: role,
      });
    }

    console.log('Roles seeded successfully');
  }

  private async assignPermissionsToRoles(permissions) {
    console.log('Assigning permissions to roles...');
    
    // Get all roles
    const adminRole = await this.roleModel.findOne({ where: { name: 'admin' } });
    const managerRole = await this.roleModel.findOne({ where: { name: 'manager' } });
    const operatorRole = await this.roleModel.findOne({ where: { name: 'operator' } });
    const inspectorRole = await this.roleModel.findOne({ where: { name: 'inspector' } });

    // Admin gets all permissions
    await adminRole.$set('permissions', permissions.map(p => p.id));
    console.log(`Assigned ${permissions.length} permissions to admin role`);
    
    // Manager permissions
    const managerPermissions = permissions.filter(p => 
      // Can't manage users except reading them
      (p.resource === 'users' ? p.action === 'read' : true) && 
      // Can't delete companies, plants, and departments
      !(p.resource === 'companies' && p.action === 'delete') &&
      !(p.resource === 'plants' && p.action === 'delete') &&
      !(p.resource === 'departments' && p.action === 'delete') &&
      !(p.resource === 'production_lines' && p.action === 'delete') &&
      // Can't delete equipment
      !(p.resource === 'equipment' && p.action === 'delete')
    );
    await managerRole.$set('permissions', managerPermissions.map(p => p.id));
    console.log(`Assigned ${managerPermissions.length} permissions to manager role`);
    
    // Operator permissions - read-only access to most resources
    const operatorPermissions = permissions.filter(p => 
      p.action === 'read' && 
      ['equipment', 'inspection', 'parameters', 'defect_types', 'production_lines'].includes(p.resource)
    );
    await operatorRole.$set('permissions', operatorPermissions.map(p => p.id));
    console.log(`Assigned ${operatorPermissions.length} permissions to operator role`);
    
    // Inspector permissions
    const inspectorPermissions = permissions.filter(p => 
      // Read access to most resources
      p.action === 'read' ||
      // Full access to inspection and parameters
      (p.resource === 'inspection' && ['create', 'update'].includes(p.action)) ||
      (p.resource === 'parameters' && ['create', 'update'].includes(p.action)) ||
      // Create and update defect types
      (p.resource === 'defect_types' && ['create', 'update'].includes(p.action))
    );
    await inspectorRole.$set('permissions', inspectorPermissions.map(p => p.id));
    console.log(`Assigned ${inspectorPermissions.length} permissions to inspector role`);
    
    console.log('Permission assignment completed');
  }

  private async seedCompanies() {
    const companies = [
      {
        name: 'Press Inspection Admin',
        address: '123 Admin Street, New York, NY 10001',
        contactInfo: { email: 'admin@pressinspection.com', phone: '123-456-7890' },
        subscriptionStatus: 'active',
      },
      {
        name: 'Acme Printing Co.',
        address: '456 Print Avenue, Chicago, IL 60601',
        contactInfo: { email: 'info@acmeprinting.com', phone: '312-555-1234' },
        subscriptionStatus: 'active',
      },
      {
        name: 'Global Manufacturing Inc.',
        address: '789 Industry Blvd, Los Angeles, CA 90001',
        contactInfo: { email: 'contact@globalmanufacturing.com', phone: '213-555-6789' },
        subscriptionStatus: 'active',
      },
    ];

    for (const company of companies) {
      await this.companyModel.findOrCreate({
        where: { name: company.name },
        defaults: company,
      });
    }

    console.log('Companies seeded successfully');
  }

  private async seedUsers(adminCompany: Company) {
    const adminRole = await this.roleModel.findOne({ where: { name: 'admin' } });
    const managerRole = await this.roleModel.findOne({ where: { name: 'manager' } });
    const operatorRole = await this.roleModel.findOne({ where: { name: 'operator' } });
    const inspectorRole = await this.roleModel.findOne({ where: { name: 'inspector' } });

    const passwordHash = await bcrypt.hash('Password123!', 10);

    const users = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: passwordHash,
        firstName: 'Admin',
        lastName: 'User',
        isActive: true,
        roleId: adminRole.id,
        companyId: adminCompany.id,
      },
      {
        username: 'manager',
        email: 'manager@example.com',
        password: passwordHash,
        firstName: 'Manager',
        lastName: 'User',
        isActive: true,
        roleId: managerRole.id,
        companyId: adminCompany.id,
      },
      {
        username: 'operator',
        email: 'operator@example.com',
        password: passwordHash,
        firstName: 'Operator',
        lastName: 'User',
        isActive: true,
        roleId: operatorRole.id,
        companyId: adminCompany.id,
      },
      {
        username: 'inspector',
        email: 'inspector@example.com',
        password: passwordHash,
        firstName: 'Inspector',
        lastName: 'User',
        isActive: true,
        roleId: inspectorRole.id,
        companyId: adminCompany.id,
      },
    ];

    for (const user of users) {
      await this.userModel.findOrCreate({
        where: { email: user.email },
        defaults: user,
      });
    }

    console.log('Users seeded successfully');
  }

  private async seedPlants() {
    const plants = [
      {
        name: 'North Plant',
        location: 'Chicago, IL',
        companyId: 1,
      },
      {
        name: 'South Plant',
        location: 'Dallas, TX',
        companyId: 1,
      },
      {
        name: 'Main Factory',
        location: 'Detroit, MI',
        companyId: 2,
      },
      {
        name: 'West Coast Facility',
        location: 'Los Angeles, CA',
        companyId: 3,
      },
    ];

    for (const plant of plants) {
      await this.plantModel.findOrCreate({
        where: { name: plant.name, companyId: plant.companyId },
        defaults: plant,
      });
    }

    console.log('Plants seeded successfully');
  }

  private async seedDepartments() {
    const departments = [
      {
        name: 'Printing Department',
        plantId: 1,
      },
      {
        name: 'Quality Control',
        plantId: 1,
      },
      {
        name: 'Sheet Printing',
        plantId: 3,
      },
      {
        name: 'Roll Printing',
        plantId: 3,
      },
      {
        name: 'Packaging Printing',
        plantId: 4,
      },
    ];

    for (const department of departments) {
      await this.departmentModel.findOrCreate({
        where: { name: department.name, plantId: department.plantId },
        defaults: department,
      });
    }

    console.log('Departments seeded successfully');
  }

  private async seedProductionLines() {
    const productionLines = [
      {
        name: 'Line A',
        departmentId: 1,
        status: 'active',
      },
      {
        name: 'Line B',
        departmentId: 1,
        status: 'inactive',
      },
      {
        name: 'QC Line 1',
        departmentId: 2,
        status: 'active',
      },
      {
        name: 'Sheet Line 1',
        departmentId: 3,
        status: 'active',
      },
      {
        name: 'Roll Line 1',
        departmentId: 4,
        status: 'active',
      },
      {
        name: 'Packaging Line 1',
        departmentId: 5,
        status: 'active',
      },
    ];

    for (const line of productionLines) {
      await this.productionLineModel.findOrCreate({
        where: { name: line.name, departmentId: line.departmentId },
        defaults: line,
      });
    }

    console.log('Production lines seeded successfully');
  }

  private async seedEquipment() {
    const equipment = [
      {
        name: 'Press Machine 1',
        type: EquipmentType.PRESS,
        model: 'HP Indigo 12000',
        serialNumber: 'PM1001',
        configuration: { maxSpeed: 4600, format: 'B2' },
        status: 'active',
        productionLineId: 1,
      },
      {
        name: 'Quality Camera 1',
        type: EquipmentType.CAMERA,
        model: 'PressCam 4K',
        serialNumber: 'QC1001',
        configuration: { resolution: '4K', fps: 30, autoFocus: true },
        status: 'active',
        productionLineId: 1,
      },
      {
        name: 'Density Sensor 1',
        type: EquipmentType.SENSOR,
        model: 'DensCheck 3000',
        serialNumber: 'DS1001',
        configuration: { accuracy: 0.01, samplingRate: 10 },
        status: 'active',
        productionLineId: 1,
      },
      {
        name: 'Press Machine 2',
        type: EquipmentType.PRESS,
        model: 'Heidelberg Speedmaster',
        serialNumber: 'PM2001',
        configuration: { maxSpeed: 15000, format: 'B1' },
        status: 'active',
        productionLineId: 4,
      },
      {
        name: 'Roll Press 1',
        type: EquipmentType.PRESS,
        model: 'Flexo XF-80',
        serialNumber: 'RP1001',
        configuration: { maxSpeed: 300, width: 80 },
        status: 'active',
        productionLineId: 5,
      },
    ];

    for (const item of equipment) {
      await this.equipmentModel.findOrCreate({
        where: { name: item.name, productionLineId: item.productionLineId },
        defaults: item,
      });
    }

    console.log('Equipment seeded successfully');
  }

  private async seedDefectTypes() {
    const defectTypes = [
      {
        name: 'Color Misalignment',
        description: 'Misalignment between color layers in printed material',
        severity: SeverityLevel.HIGH,
      },
      {
        name: 'Ink Density Too Low',
        description: 'Ink density below acceptable threshold',
        severity: SeverityLevel.MEDIUM,
      },
      {
        name: 'Ink Density Too High',
        description: 'Ink density above acceptable threshold',
        severity: SeverityLevel.MEDIUM,
      },
      {
        name: 'Paper Wrinkle',
        description: 'Wrinkles or creases in paper substrate',
        severity: SeverityLevel.HIGH,
      },
      {
        name: 'Missing Print',
        description: 'Areas where print is missing or incomplete',
        severity: SeverityLevel.CRITICAL,
      },
      {
        name: 'Ghosting',
        description: 'Unintended image appearing as a ghost of a previous impression',
        severity: SeverityLevel.MEDIUM,
      },
      {
        name: 'Streaking',
        description: 'Unwanted streaks appearing in the print direction',
        severity: SeverityLevel.MEDIUM,
      },
      {
        name: 'Dot Gain Too High',
        description: 'Excessive dot gain causing image distortion',
        severity: SeverityLevel.MEDIUM,
      },
      {
        name: 'Paper Jam',
        description: 'Paper jam in the press machinery',
        severity: SeverityLevel.CRITICAL,
      },
      {
        name: 'Hickeys',
        description: 'Small spots or imperfections in printing',
        severity: SeverityLevel.LOW,
      },
    ];

    for (const defectType of defectTypes) {
      await this.defectTypeModel.findOrCreate({
        where: { name: defectType.name },
        defaults: defectType,
      });
    }

    console.log('Defect types seeded successfully');
  }
}