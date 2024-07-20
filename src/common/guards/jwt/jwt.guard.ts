import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isNoAuth = this.reflector.getAllAndOverride<boolean>('noAuth', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isNoAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization;
    if (token?.includes(' ')) {
      token = token?.split(' ')[1];
    }
    if (token === undefined || token === '' || token === null) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['auth'] = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
