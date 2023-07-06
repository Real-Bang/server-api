import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const testUser = await prisma.user.upsert({
    where: {
      provider_providerId: {
        provider: 'sample',
        providerId: 'test',
      },
    },
    update: {},
    create: {
      provider: 'sample',
      providerId: 'test',
      name: 'test',
      email: 'test@realbang.com',
    },
  });
  console.log(testUser, 'created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
