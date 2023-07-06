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

  async logIn(user: User) {
    Logger.log(user);
    if (!user) {
      throw new BadRequestException('Unauthenticated.');
    }

    const payload: JwtPayload = { username: user.name, sub: user.providerId };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  register(user: CreateUserDto) {
    try {
      const newUser = this.usersService.create(user);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
