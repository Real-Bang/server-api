import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './domain/auth/auth.module';
import { GoogleOauthModule } from './domain/auth/google-oauth/google-oauth.module';
import { JwtAuthGuard } from './domain/auth/jwt-auth.guard';
import { UsersModule } from './domain/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, GoogleOauthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
