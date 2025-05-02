import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // console.log('payload =========== >>>>> ', payload);

    const userId = typeof payload.sub === 'string' ? parseInt(payload.sub, 10) : payload.sub;
    return {
      id: userId,
      email: payload.email,
      roles: payload.roles,
      permissions: payload.permissions,
      country: payload.country
    };
  }
}