import authConfig from '@/config/auth.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

export interface JwtPayload {
  username: string;
  sub: string;
}

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY) configService: ConfigType<typeof authConfig>,
  ) {
    const extractJwtFromCookie = (req: Request) => {
      let token = null;

      if (req && req.cookies) {
        token = req.cookies['jwt'];
      }
      return token;
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}
