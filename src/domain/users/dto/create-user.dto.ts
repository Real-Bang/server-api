import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  provider: string;

  @ApiProperty()
  providerId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
