import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './domain/auth/auth.module';
import { GoogleOauthModule } from './domain/auth/google-oauth/google-oauth.module';
import { JwtAuthGuard } from './domain/auth/jwt-auth.guard';
import { RoomsModule } from './domain/rooms/rooms.module';
import { UsersModule } from './domain/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesGuard } from './domain/auth/roles/roles.guard';

@Module({
  imports: [
    AuthModule,
    RoomsModule,
    UsersModule,
    PrismaModule,
    GoogleOauthModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
