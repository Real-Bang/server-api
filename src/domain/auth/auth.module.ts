import authConfig from '@/config/auth.config';
import { UsersModule } from '@/domain/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('auth.jwt.secret'),
          signOptions: {
            expiresIn: configService.get<string>('auth.jwt.expiresIn'),
          },
        };
      },
      imports: [ConfigModule.forFeature(authConfig)],
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthStrategy, AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
