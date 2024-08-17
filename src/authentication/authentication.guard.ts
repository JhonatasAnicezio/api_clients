import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface UserPayload {
  sub: string,
  name: string,
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenHeader(request);

    if(!token) {
      throw new UnauthorizedException('Not authentication');
    }

    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);

      request.user = payload;
    } catch(error) {
      throw new UnauthorizedException('token invalid');
    }

    return false;
  }

  private extractTokenHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token: undefined;
  }
}
