import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { S3Module } from './S3/s3.module';
import { AppController } from './app.controller';
import { AuthModule } from './domain/auth/auth.module';
import { GoogleOauthModule } from './domain/auth/google-oauth/google-oauth.module';
import { RolesGuard } from './domain/auth/roles/roles.guard';
import { RoomsModule } from './domain/rooms/rooms.module';
import { UsersModule } from './domain/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadsModule } from './domain/uploads/uploads.module';

@Module({
  imports: [
    AuthModule,
    GoogleOauthModule,
    PrismaModule,
    S3Module,
    RoomsModule,
    UsersModule,
    UploadsModule,
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
