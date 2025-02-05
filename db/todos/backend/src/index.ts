import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: { email, password, firstName, lastName },
    select: { email: true, firstName: true },
  });
  console.log(res);
}

async function updateUsers(email: string, firstName: string, lastName: string) {
  const res = await prisma.user.update({
    where: { email },
    data: { firstName, lastName },
    select: {
      firstName: true,
      lastName: true,
    },
  });
  console.log(res);
}

// insertUser('salman@example.com', '123456', 'Md', 'Salman');
updateUsers('salman@example.com', 'Mohammad', 'SALMAN');
