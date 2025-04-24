import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: string[]) => 
  SetMetadata(PERMISSIONS_KEY, permissions);




// When a separate @RequirePermission might be useful
// There are specific scenarios where a separate permission check might be valuable:

// Very granular permissions: When you have dozens or hundreds of specific permissions, and you want to be explicit about exactly which permission is needed for each endpoint.
// Dynamic permission assignment: If you have a system where permissions can be added or removed from roles dynamically (by admins through a UI), checking the specific permission provides more resilience against role changes.
// Temporary permissions: If you have a system where users can be granted specific permissions temporarily, outside of their normal role.
// Multiple permission patterns: When some endpoints need a combination of permissions that don't neatly align with role boundaries.
// Documentation value: Being explicit about the exact permission needed can serve as self-documentation in the code.

// Example :-

// @Get('users')
// @RequirePermission('users', 'read')
// findAll() {
//   return this.userService.findAll();
// }