import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt.types';
import { env } from 'src/config/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    const { sub: userId, email, name, role } = payload;

    if (!userId || !email || !role) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return { userId, email, name, role };
  }
}
