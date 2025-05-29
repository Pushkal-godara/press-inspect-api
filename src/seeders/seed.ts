import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../modules/user/user.service';
import { RolesService } from '../modules/roles/roles.service';
import { PermissionsService } from '../modules/permissions/permissions.service';
import { GroupsService } from '../modules/groups/groups.service';
import { ModelsService } from '../modules/models/models.service';
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
  const yearsService = app.get(YearsService);
  const unitsService = app.get(UnitsService);

  // Create permissions
  console.log('Creating permissions...');

  const permissions = [
    // User permissions
    { name: 'Create User', resource: 'users', action: 'create', description: 'Create a new user', created_at: new Date(), updated_at: new Date() },
    { name: 'Read Users', resource: 'users', action: 'read', description: 'Read user information', created_at: new Date(), updated_at: new Date() },
    { name: 'Update User', resource: 'users', action: 'update', description: 'Update user information', created_at: new Date(), updated_at: new Date() },
    { name: 'Delete User', resource: 'users', action: 'delete', description: 'Delete a user', created_at: new Date(), updated_at: new Date() },

    // Role permissions
    { name: 'Create Role', resource: 'roles', action: 'create', description: 'Create a new role', created_at: new Date(), updated_at: new Date() },
    { name: 'Read Roles', resource: 'roles', action: 'read', description: 'Read role information', created_at: new Date(), updated_at: new Date() },
    { name: 'Update Role', resource: 'roles', action: 'update', description: 'Update role information', created_at: new Date(), updated_at: new Date() },
    { name: 'Delete Role', resource: 'roles', action: 'delete', description: 'Delete a role', created_at: new Date(), updated_at: new Date() },

    // Permission permissions
    { name: 'Create Permission', resource: 'permissions', action: 'create', description: 'Create a new permission', created_at: new Date(), updated_at: new Date() },
    { name: 'Read Permissions', resource: 'permissions', action: 'read', description: 'Read permission information', created_at: new Date(), updated_at: new Date() },
    { name: 'Update Permission', resource: 'permissions', action: 'update', description: 'Update permission information', created_at: new Date(), updated_at: new Date() },
    { name: 'Delete Permission', resource: 'permissions', action: 'delete', description: 'Delete a permission', created_at: new Date(), updated_at: new Date() },

    // Group permissions
    { name: 'Create Group', resource: 'groups', action: 'create', description: 'Create a new group', created_at: new Date(), updated_at: new Date() },
    { name: 'Read Groups', resource: 'groups', action: 'read', description: 'Read group information', created_at: new Date(), updated_at: new Date() },
    { name: 'Update Group', resource: 'groups', action: 'update', description: 'Update group information', created_at: new Date(), updated_at: new Date() },
    { name: 'Delete Group', resource: 'groups', action: 'delete', description: 'Delete a group', created_at: new Date(), updated_at: new Date() },

    // Model permissions
    { name: 'Create Model', resource: 'models', action: 'create', description: 'Create a new model', created_at: new Date(), updated_at: new Date() },
    { name: 'Read Models', resource: 'models', action: 'read', description: 'Read model information', created_at: new Date(), updated_at: new Date() },
    { name: 'Update Model', resource: 'models', action: 'update', description: 'Update model information', created_at: new Date(), updated_at: new Date() },
    { name: 'Delete Model', resource: 'models', action: 'delete', description: 'Delete a model', created_at: new Date(), updated_at: new Date() },

    // Report permissions
    { name: 'Create Report', resource: 'reports', action: 'create', description: 'Create a new report', created_at: new Date(), updated_at: new Date() },
    { name: 'Read Reports', resource: 'reports', action: 'read', description: 'Read report information', created_at: new Date(), updated_at: new Date() },
    { name: 'Update Report', resource: 'reports', action: 'update', description: 'Update report information', created_at: new Date(), updated_at: new Date() },
    { name: 'Delete Report', resource: 'reports', action: 'delete', description: 'Delete a report', created_at: new Date(), updated_at: new Date() },
    { name: 'Export Report', resource: 'reports', action: 'export', description: 'Export a report', created_at: new Date(), updated_at: new Date() },

    // Domain-specific permissions
    { name: 'PrePress Inspection', resource: 'inspection', action: 'prepress', description: 'Conduct PrePress inspections', created_at: new Date(), updated_at: new Date() },
    { name: 'Press Inspection', resource: 'inspection', action: 'press', description: 'Conduct Press inspections', created_at: new Date(), updated_at: new Date() },
    { name: 'PostPress Inspection', resource: 'inspection', action: 'postpress', description: 'Conduct PostPress inspections', created_at: new Date(), updated_at: new Date() },
    { name: 'Packaging Inspection', resource: 'inspection', action: 'packaging', description: 'Conduct Packaging inspections', created_at: new Date(), updated_at: new Date() },
  ];

  const additionalPermissions = [
    { name: 'Manage Admins', resource: 'admins', action: 'manage', description: 'Create, update, delete admin users', created_at: new Date(), updated_at: new Date() },
    { name: 'Global Access', resource: 'system', action: 'global', description: 'Access users and data across all countries', created_at: new Date(), updated_at: new Date() },
    { name: 'Manage Roles Assignment', resource: 'roles', action: 'assign', description: 'Assign roles to users', created_at: new Date(), updated_at: new Date() },
    { name: 'View System Analytics', resource: 'system', action: 'analytics', description: 'View global system analytics', created_at: new Date(), updated_at: new Date() },
    { name: 'Manage Country Settings', resource: 'system', action: 'country', description: 'Manage country-specific settings', created_at: new Date(), updated_at: new Date() },
    { name: 'Manage Super Admin', resource: 'system', action: 'super', description: 'Manage Super Admin users and settings', created_at: new Date(), updated_at: new Date() },
    { name: 'View Own Reports', resource: 'reports', action: 'view-own', description: 'View only reports related to own equipment', created_at: new Date(), updated_at: new Date() },
  ];

  permissions.push(...additionalPermissions);

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

  // Create a list of permissions exclusive to Super Admin
  const superAdminExclusivePermissions = [
    'admins:manage',
    'system:global',
    'system:super'
  ];

  // Filter admin permissions to exclude Super Admin exclusive ones
  const adminPermissions = Object.values(createdPermissions).filter(
    permissionId => !superAdminExclusivePermissions.some(
      exclusivePerm => createdPermissions[exclusivePerm] === permissionId
    )
  );

  const roles = [

    {
      name: 'SuperAdmin',
      description: 'Super Admin with full access',
      permissions: Object.values(createdPermissions),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Admin',
      description: 'Administrator with country-based access',
      permissions: adminPermissions,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Customer',
      description: 'Customer who can view their own inspection reports',
      permissions: [
        createdPermissions['reports:read'],
        createdPermissions['groups:read'],
        createdPermissions['models:read'],
        createdPermissions['items:read'],
        createdPermissions['reports:view-own'],
      ],
      created_at: new Date(),
      updated_at: new Date()
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
      created_at: new Date(),
      updated_at: new Date()
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
      created_at: new Date(),
      updated_at: new Date()
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
      created_at: new Date(),
      updated_at: new Date()
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
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Engineer',
      description: 'Engineer with access to all reports',
      permissions: [
        createdPermissions['reports:read'],
        createdPermissions['groups:read'],
        createdPermissions['models:read'],
        createdPermissions['items:read'],
      ]
    }
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

//   // Create admin user
//   console.log('Creating admin user...');

//   try {
//     const adminUser = await usersService.create({
//       username: 'Admin User',
//       email: 'admin@printocare.com',
//       roleId: 2,
//       password: 'admin123',
//       country: 'UAE',
//       created_at: new Date(),
//       updated_at: new Date()
//     });

//     await usersService.addRole(adminUser.id, { roleId: createdRoles['Admin'] });

//     console.log('Admin user created successfully');
//   } catch (error) {
//     console.log('Error creating admin user:', error.message);
//   }


//   // Create super admin user
//   console.log('Creating super admin user...');

//   try {
//     const superAdminUser = await usersService.create({
//       username: 'Super Admin',
//       email: 'superadmin@printocare.com',
//       roleId: 1,
//       country: 'UAE',
//       password: 'superadmin123',
//       created_at: new Date(),
//       updated_at: new Date()
//     });

//     await usersService.addRole(superAdminUser.id, { roleId: createdRoles['Super Admin'] });

//     console.log('Super Admin user created successfully');
//   } catch (error) {
//     console.log('Error creating super admin user:', error.message);
//   }

  // Create groups
  console.log('Creating groups...');

  const groups = [
    { name: 'Pre Press', created_at: new Date(), updated_at: new Date() },
    { name: 'Press', created_at: new Date(), updated_at: new Date() },
    { name: 'Post Press', created_at: new Date(), updated_at: new Date() },
    { name: 'Packaging', created_at: new Date(), updated_at: new Date() },
    { name: 'Peripherals', created_at: new Date(), updated_at: new Date() },
    { name: 'Spare Parts', created_at: new Date(), updated_at: new Date() },
    { name: 'New Products', created_at: new Date(), updated_at: new Date() }
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

//   // Create Pre Press models
//   console.log('Creating Pre Press models...');

//   const prePressModels = [
//     { name: 'Suprasetter', groupId: createdGroups['Pre Press'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Software', groupId: createdGroups['Pre Press'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Topsetter', groupId: createdGroups['Pre Press'], created_at: new Date(), updated_at: new Date() },
//   ];

//   const createdModels = {};

//   for (const model of prePressModels) {
//     try {
//       const created = await modelsService.create(model);
//       createdModels[model.name] = created.id;
//       console.log(`Created model: ${model.name}`);
//     } catch (error) {
//       console.log(`Error creating model: ${model.name}`, error.message);
//     }
//   }

//   // Create Suprasetter items
//   console.log('Creating Suprasetter items...');

//   const suprasetterItems = [
//     { name: 'Suprasetter 52', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter 74', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter 75', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter 105', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter 106', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter A52', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter A74', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter A75', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter A105', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//     { name: 'Suprasetter A106', modelId: createdModels['Suprasetter'], created_at: new Date(), updated_at: new Date() },
//   ];

//   for (const item of suprasetterItems) {
//     try {
//       await itemsService.create(item);
//       console.log(`Created item: ${item.name}`);
//     } catch (error) {
//       console.log(`Error creating item: ${item.name}`, error.message);
//     }
//   }

//   // Create years
//   console.log('Creating years...');

//   const years = [
//     { range: '1960 - 1965', created_at: new Date(), updated_at: new Date() },
//     { range: '1966 - 1970', created_at: new Date(), updated_at: new Date() },
//     { range: '1971 - 1975', created_at: new Date(), updated_at: new Date() },
//     { range: '1976 - 1980', created_at: new Date(), updated_at: new Date() },
//     { range: '1981 - 1985', created_at: new Date(), updated_at: new Date() },
//     { range: '1986 - 1990', created_at: new Date(), updated_at: new Date() },
//     { range: '1991 - 1995', created_at: new Date(), updated_at: new Date() },
//     { range: '1996 - 2000', created_at: new Date(), updated_at: new Date() },
//     { range: '2001 - 2005', created_at: new Date(), updated_at: new Date() },
//     { range: '2006 - 2010', created_at: new Date(), updated_at: new Date() },
//     { range: '2011 - 2015', created_at: new Date(), updated_at: new Date() },
//     { range: '2020 - 2024', created_at: new Date(), updated_at: new Date() },
//   ];

//   for (const year of years) {
//     try {
//       await yearsService.create(year);
//       console.log(`Created year range: ${year.range}`);
//     } catch (error) {
//       console.log(`Error creating year range: ${year.range}`, error.message);
//     }
//   }

  // Create units
  console.log('Creating units...');

  const units = [
    { name: 'Feeder Unit', created_at: new Date(), updated_at: new Date() },
    { name: 'Printing Unit', created_at: new Date(), updated_at: new Date() },
    { name: 'Coating Unit', created_at: new Date(), updated_at: new Date() },
    { name: 'Delivery Unit', created_at: new Date(), updated_at: new Date() },
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