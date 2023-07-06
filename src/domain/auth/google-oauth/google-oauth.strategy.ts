import authConfig from '@/config/auth.config';
import { User } from '@domain/users/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(authConfig.KEY) configService: ConfigType<typeof authConfig>,
  ) {
    super({
      clientID: configService.google.id,
      clientSecret: configService.google.secret,
      callbackURL: configService.google.callback,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails, photos } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      // picture: photos[0].value,
    } satisfies User;

    return user;
  }
}
