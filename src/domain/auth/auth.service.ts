import { User } from '@/domain/users/entities/user.entity';
import { CreateUserDto } from '@domain/users/dto/create-user.dto';
import { UsersService } from '@domain/users/users.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async getToken(user: CreateUserDto) {
    Logger.log(user);
    if (!user) {
      throw new BadRequestException('Unauthenticated.');
    }

    const registeredUser = await this.usersService.findOne(
      user.provider,
      user.providerId,
    );

    if (!registeredUser) {
      this.register(user);
    }

    const payload: JwtPayload = {
      provider: user.provider,
      providerId: user.providerId,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  register(user: CreateUserDto) {
    try {
      this.usersService.create(user);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
