interface User {
  name: string;
  readonly age: number;
  email: string;
  jobRole: string;
  createdAt: Date;
}

type NumberType = number | string | boolean;

type ExcludedUser = Exclude<NumberType, 'string'>;

const user: ExcludedUser = 'one';

type UserProp = Pick<User, 'name' | 'age' | 'jobRole'>;
type OptionalUserProp = Partial<Pick<User, 'name' | 'age' | 'jobRole'>>;

type UserNew = Readonly<User>;

function sumOfAge(user1: UserProp, user2: UserProp) {
  return user1.age + user2.age;
}

console.log(
  sumOfAge(
    { name: 'salman', age: 27, jobRole: 'senior software developer' },
    { name: 'aman', age: 22, jobRole: 'Junior accountant' }
  )
);

const arr: (string | number)[] = [1, 2, 3, 4, 'this is number'];

console.log(arr);

interface User1 {
  username: string;
  email: string;
}

const userThree = {};

type UserObject = Record<string, User1>;

const userOne: UserObject = {
  username: { username: 'salman', email: 's@salman.com' },
  email: { username: 'salman@gmail.com', email: 's2' },
};

const userTwo: User1[] = [{ username: 'salman', email: 'salman' }];

const people: Record<number, string> = {
  12: 'adimn',
  123: 'lkjklj',
};

interface NewUserInterface {
  name: string;
  email: string;
}

const userMap = new Map<string, number>();

userMap.set('one', 1);
userMap.set('two', 1);
userMap.set('three', 333);
userMap.set('four', 1);

console.log(userMap.get('three'));
