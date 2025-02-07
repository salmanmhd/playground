import { PrismaClient } from '@prisma/client';
import { AssertionError } from 'assert';

const prisma = new PrismaClient();

// create
async function addUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
    },
  });
  console.log('user created');
  console.log(res);
}

// read
async function getUser(username: string) {
  const res = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  console.log(res);
  //   return res;
}

// delete
async function deleteUser(username: string) {
  const res = await prisma.user.delete({
    where: {
      username,
    },
  });
  console.log('user delete');
  console.log(res);
}
type UpdateType = {
  firstName: string;
  lastName: string;
};

// update
async function updateUser(
  username: string,
  { firstName, lastName }: UpdateType
) {
  const res = await prisma.user.update({
    where: {
      username,
    },
    data: {
      firstName,
      lastName,
    },
  });
  console.log(res);
}

async function createTodo(user_id: number, title: string, description: string) {
  const res = await prisma.todo.create({
    data: {
      title,
      description,
      user_id,
    },
  });
  console.log('todos created successfully');
  console.log(res);
}

async function getTodos(user_id: number) {
  const res = await prisma.todo.findMany({
    where: {
      user_id,
    },
  });
  console.log(res);
}

async function getUserDetails(id: number) {
  const res = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      todos: true,
    },
  });
  console.log(res);
}

// addUser('sameer', 'password', 'sameer', 'ameer');
// getUser('sam');
getUserDetails(2);
// deleteUser('sameer');
// updateUser('sam', {
//   firstName: 'salamn',
//   lastName: 'md',
// });
// createTodo(
//   2,
//   'study with focus',
//   'when you are studying, study with focus, dont get distacted'
// );

// getTodos(2);
