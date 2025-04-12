import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET', 'kngkna03r84rw@7e6r$$8gn%gklj5*tu8h&'),
  signOptions: {
    expiresIn: configService.get<string>('JWT_EXPIRATION', '1d'),
  },
});