import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
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

    const { user } = context.switchToHttp().getRequest();
    
    if (!user || !user.permissions) {
      throw new ForbiddenException('User not authenticated');
    }

    // // Check if user's role has the required permission
    // const hasPermission = user.role?.permissions?.some(
    //   permission => 
    //     permission.resource === requiredPermission.resource && 
    //     permission.action === requiredPermission.action
    // );
    
    // if (!hasPermission) {
    //   throw new ForbiddenException(`Insufficient permissions. Requires ${requiredPermission.action} access to ${requiredPermission.resource}`);
    // }
    
    return requiredPermissions.every(permission => 
      user.permissions.includes(permission)
    );;
  }
}