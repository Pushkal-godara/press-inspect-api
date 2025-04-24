import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../modules/user/user.service';
import { RolesService } from '../modules/roles/roles.service';
import { PermissionsService } from '../modules/permissions/permissions.service';
import { GroupsService } from '../modules/groups/groups.service';
import { ModelsService } from '../modules/models/models.service';
import { ItemsService } from '../modules/items/items.service';
import { YearsService } from '../modules/years/years.service';
import { UnitsService } from '../modules/units/units.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const usersService = app.get(UserService);
  const rolesService = app.get(RolesService);
  const permissionsService = app.get(PermissionsService);
  const groupsService = app.get(GroupsService);
  const modelsService = app.get(ModelsService);
  const itemsService = app.get(ItemsService);
  const yearsService = app.get(YearsService);
  const unitsService = app.get(UnitsService);

  // Create permissions
  console.log('Creating permissions...');
  
  const permissions = [
    // User permissions
    { name: 'Create User', resource: 'users', action: 'create', description: 'Create a new user' },
    { name: 'Read Users', resource: 'users', action: 'read', description: 'Read user information' },
    { name: 'Update User', resource: 'users', action: 'update', description: 'Update user information' },
    { name: 'Delete User', resource: 'users', action: 'delete', description: 'Delete a user' },
    
    // Role permissions
    { name: 'Create Role', resource: 'roles', action: 'create', description: 'Create a new role' },
    { name: 'Read Roles', resource: 'roles', action: 'read', description: 'Read role information' },
    { name: 'Update Role', resource: 'roles', action: 'update', description: 'Update role information' },
    { name: 'Delete Role', resource: 'roles', action: 'delete', description: 'Delete a role' },
    
    // Permission permissions
    { name: 'Create Permission', resource: 'permissions', action: 'create', description: 'Create a new permission' },
    { name: 'Read Permissions', resource: 'permissions', action: 'read', description: 'Read permission information' },
    { name: 'Update Permission', resource: 'permissions', action: 'update', description: 'Update permission information' },
    { name: 'Delete Permission', resource: 'permissions', action: 'delete', description: 'Delete a permission' },
    
    // Group permissions
    { name: 'Create Group', resource: 'groups', action: 'create', description: 'Create a new group' },
    { name: 'Read Groups', resource: 'groups', action: 'read', description: 'Read group information' },
    { name: 'Update Group', resource: 'groups', action: 'update', description: 'Update group information' },
    { name: 'Delete Group', resource: 'groups', action: 'delete', description: 'Delete a group' },
    
    // Model permissions
    { name: 'Create Model', resource: 'models', action: 'create', description: 'Create a new model' },
    { name: 'Read Models', resource: 'models', action: 'read', description: 'Read model information' },
    { name: 'Update Model', resource: 'models', action: 'update', description: 'Update model information' },
    { name: 'Delete Model', resource: 'models', action: 'delete', description: 'Delete a model' },
    
    // Item permissions
    { name: 'Create Item', resource: 'items', action: 'create', description: 'Create a new item' },
    { name: 'Read Items', resource: 'items', action: 'read', description: 'Read item information' },
    { name: 'Update Item', resource: 'items', action: 'update', description: 'Update item information' },
    { name: 'Delete Item', resource: 'items', action: 'delete', description: 'Delete a item' },
    
    // Report permissions
    { name: 'Create Report', resource: 'reports', action: 'create', description: 'Create a new report' },
    { name: 'Read Reports', resource: 'reports', action: 'read', description: 'Read report information' },
    { name: 'Update Report', resource: 'reports', action: 'update', description: 'Update report information' },
    { name: 'Delete Report', resource: 'reports', action: 'delete', description: 'Delete a report' },
    { name: 'Export Report', resource: 'reports', action: 'export', description: 'Export a report' },
    
    // Domain-specific permissions
    { name: 'PrePress Inspection', resource: 'inspection', action: 'prepress', description: 'Conduct PrePress inspections' },
    { name: 'Press Inspection', resource: 'inspection', action: 'press', description: 'Conduct Press inspections' },
    { name: 'PostPress Inspection', resource: 'inspection', action: 'postpress', description: 'Conduct PostPress inspections' },
    { name: 'Packaging Inspection', resource: 'inspection', action: 'packaging', description: 'Conduct Packaging inspections' },
  ];

  const createdPermissions = {};
  
  for (const permission of permissions) {
    try {
      const created = await permissionsService.create(permission);
      createdPermissions[`${permission.resource}:${permission.action}`] = created.id;
      console.log(`Created permission: ${permission.name}`);
    } catch (error) {
      console.log(`Error creating permission: ${permission.name}`, error.message);
    }
  }

  // Create roles
  console.log('Creating roles...');
  
  const roles = [
    {
      name: 'Admin',
      description: 'Administrator with full access',
      permissions: Object.values(createdPermissions),
    },
    {
      name: 'PrePressInspector',
      description: 'Inspector for Pre Press equipment',
      permissions: [
        createdPermissions['reports:create'],
        createdPermissions['reports:read'],
        createdPermissions['reports:update'],
        createdPermissions['reports:export'],
        createdPermissions['groups:read'],
        createdPermissions['models:read'],
        createdPermissions['items:read'],
        createdPermissions['inspection:prepress'],
      ],
    },
    {
      name: 'PressInspector',
      description: 'Inspector for Press equipment',
      permissions: [
        createdPermissions['reports:create'],
        createdPermissions['reports:read'],
        createdPermissions['reports:update'],
        createdPermissions['reports:export'],
        createdPermissions['groups:read'],
        createdPermissions['models:read'],
        createdPermissions['items:read'],
        createdPermissions['inspection:press'],
      ],
    },
    {
      name: 'PostPressInspector',
      description: 'Inspector for Post Press equipment',
      permissions: [
        createdPermissions['reports:create'],
        createdPermissions['reports:read'],
        createdPermissions['reports:update'],
        createdPermissions['reports:export'],
        createdPermissions['groups:read'],
        createdPermissions['models:read'],
        createdPermissions['items:read'],
        createdPermissions['inspection:postpress'],
      ],
    },
    {
      name: 'PackagingInspector',
      description: 'Inspector for Packaging equipment',
      permissions: [
        createdPermissions['reports:create'],
        createdPermissions['reports:read'],
        createdPermissions['reports:update'],
        createdPermissions['reports:export'],
        createdPermissions['groups:read'],
        createdPermissions['models:read'],
        createdPermissions['items:read'],
        createdPermissions['inspection:packaging'],
      ],
    },
  ];

  const createdRoles = {};
  
  for (const role of roles) {
    try {
      const { permissions, ...roleData } = role;
      const created = await rolesService.create(roleData);
      
      for (const permissionId of permissions) {
        await rolesService.addPermission(created.id, { permissionId });
      }
      
      createdRoles[role.name] = created.id;
      console.log(`Created role: ${role.name}`);
    } catch (error) {
      console.log(`Error creating role: ${role.name}`, error.message);
    }
  }

  // Create admin user
  console.log('Creating admin user...');
  
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await usersService.create({
      username: 'Admin User',
      email: 'admin@printocare.com',
      password: hashedPassword,
    });
    
    await usersService.addRole(adminUser.id, { roleId: createdRoles['Admin'] });
    
    console.log('Admin user created successfully');
  } catch (error) {
    console.log('Error creating admin user:', error.message);
  }

  // Create groups
  console.log('Creating groups...');
  
  const groups = [
    { name: 'Pre Press' },
    { name: 'Press' },
    { name: 'Post Press' },
    { name: 'Packaging' },
  ];

  const createdGroups = {};
  
  for (const group of groups) {
    try {
      const created = await groupsService.create(group);
      createdGroups[group.name] = created.id;
      console.log(`Created group: ${group.name}`);
    } catch (error) {
      console.log(`Error creating group: ${group.name}`, error.message);
    }
  }

  // Create Pre Press models
  console.log('Creating Pre Press models...');
  
  const prePressModels = [
    { name: 'Suprasetter', groupId: createdGroups['Pre Press'] },
    { name: 'Software', groupId: createdGroups['Pre Press'] },
    { name: 'Topsetter', groupId: createdGroups['Pre Press'] },
  ];

  const createdModels = {};
  
  for (const model of prePressModels) {
    try {
      const created = await modelsService.create(model);
      createdModels[model.name] = created.id;
      console.log(`Created model: ${model.name}`);
    } catch (error) {
      console.log(`Error creating model: ${model.name}`, error.message);
    }
  }

  // Create Suprasetter items
  console.log('Creating Suprasetter items...');
  
  const suprasetterItems = [
    { name: 'Suprasetter 52', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter 74', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter 75', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter 105', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter 106', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter A52', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter A74', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter A75', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter A105', modelId: createdModels['Suprasetter'] },
    { name: 'Suprasetter A106', modelId: createdModels['Suprasetter'] },
  ];

  for (const item of suprasetterItems) {
    try {
      await itemsService.create(item);
      console.log(`Created item: ${item.name}`);
    } catch (error) {
      console.log(`Error creating item: ${item.name}`, error.message);
    }
  }

  // Create years
  console.log('Creating years...');
  
  const years = [
    { range: '1960 - 1965' },
    { range: '1966 - 1970' },
    { range: '1971 - 1975' },
    { range: '1976 - 1980' },
    { range: '1981 - 1985' },
    { range: '1986 - 1990' },
    { range: '1991 - 1995' },
    { range: '1996 - 2000' },
    { range: '2001 - 2005' },
    { range: '2006 - 2010' },
    { range: '2011 - 2015' },
    { range: '2020 - 2024' },
  ];

  for (const year of years) {
    try {
      await yearsService.create(year);
      console.log(`Created year range: ${year.range}`);
    } catch (error) {
      console.log(`Error creating year range: ${year.range}`, error.message);
    }
  }

  // Create units
  console.log('Creating units...');
  
  const units = [
    { name: 'Feeder Unit' },
    { name: 'Printing Unit' },
    { name: 'Coating Unit' },
    { name: 'Delivery Unit' },
  ];

  const createdUnits = {};
  
  for (const unit of units) {
    try {
      const created = await unitsService.create(unit);
      createdUnits[unit.name] = created.id;
      console.log(`Created unit: ${unit.name}`);
    } catch (error) {
      console.log(`Error creating unit: ${unit.name}`, error.message);
    }
  }

  console.log('Seeding completed!');
  
  await app.close();
}

bootstrap();