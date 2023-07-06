import authConfig from '@/config/auth.config';
import { UsersService } from '@domain/users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';

@Module({
  imports: [ConfigModule.forFeature(authConfig), AuthModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy, UsersService],
})
export class GoogleOauthModule {}
