import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CURRENT_USER_KEY } from 'src/utils/constants';
import { JWTPayloadType } from 'src/utils/types';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/utils/user.type';
import { UserService } from '../user.service';
@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  public async canActivate(context: ExecutionContext) {
    const roles: UserType[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) return false;

    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      try {
        const payload: JWTPayloadType = await this.jwtService.verifyAsync(
          token,
          { secret: this.configService.get<string>('JWT_SECRET') },
        );
        const user = await this.userService.getCurrentUser(payload.id);
        if (!user) {
          return false;
        }
        if (roles.includes(user.userType)) {
          request[CURRENT_USER_KEY] = payload;
          return true;
        }
      } catch (e) {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      throw new UnauthorizedException('Invalid token');
    }
    return false;
  }

  /*
    example 
    @Get()
    @Roles(UserType.ADMIN)
    @UserGuards(AuthRolesGuard)
    getAllUser() {}
  */
}
