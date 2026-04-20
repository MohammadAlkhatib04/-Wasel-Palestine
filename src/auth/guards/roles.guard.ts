import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, CURRENT_USER_KEY } from 'src/utils/constants';
import { UserType } from 'src/utils/user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request[CURRENT_USER_KEY];

    if (!user) {
      return false;
    }

    if (!roles.includes(user.userType)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
