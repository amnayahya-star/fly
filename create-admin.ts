import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aero.com' },
    update: {
      role: 'ADMIN',
      password: 'password123'
    },
    create: {
      name: 'Super Admin',
      email: 'admin@aero.com',
      password: 'password123',
      role: 'ADMIN'
    }
  });

  console.log('Admin user created/updated:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
