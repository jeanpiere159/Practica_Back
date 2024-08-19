import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Falta colocar la cabezera tonto');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Falto un token ');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: 'clavezon',
      });

      request.user = decoded;

      return super.canActivate(context) as Promise<boolean>;
    } catch (error) {
      throw new UnauthorizedException('Token invalido como tu jajaajaja');
    }
  }
}
