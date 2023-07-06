import { Prisma } from '@prisma/client';

const userWithPosts = Prisma.validator<Prisma.UserArgs>()({});
export type UserWithPosts = Prisma.UserGetPayload<typeof userWithPosts>;

export { type User } from '@prisma/client';
