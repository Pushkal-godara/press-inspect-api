import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY, 
      [
        context.getHandler(),
        context.getClass(),
      ]
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Super Admin always has access
    if (user.roles.includes('SuperAdmin')) {
      return true;
    }
    
    // For Admin role, apply country restrictions on user management
    if (user.roles.includes('Admin') && 
        requiredPermissions.some(p => p.startsWith('users:'))) {
      
      // Get the target user ID from params
      const targetUserId = request.params.id;
      if (targetUserId) {
        const targetUser = await this.userService.findById(+targetUserId, user);
        
        // If target user is a Super Admin, deny access
        if (targetUser.roles.some(r => r.name === 'SuperAdmin')) {
          return false;
        }
        
        // If countries don't match, deny access
        if (targetUser.country_id !== user.country) {
          return false;
        }
      }
    }
    
    return requiredPermissions.every(permission => 
      user.permissions.includes(permission)
    );
  }
}