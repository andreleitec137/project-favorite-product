import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from './jwt.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.get<string[]>('roles', ctx.getHandler()) ??
      this.reflector.get<string[]>('roles', ctx.getClass());

    if (!requiredRoles) return true;

    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: JwtPayload }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found on request');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient role');
    }

    return true;
  }
}
