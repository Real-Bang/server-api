import { CreateUserDto } from '@/domain/users/dto/create-user.dto';

export {};

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends CreateUserDto {}
  }
}
