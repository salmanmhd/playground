interface UserProfile {
  name: string;
  age: number;
  hobbies: string[];
}

function createUserProfile(
  name: string,
  age: number,
  hobbies: string[]
): UserProfile {
  return {
    name: name,
    age: age,
    hobbies: hobbies,
  };
}

const userProfile = createUserProfile('John Doe', 25, ['Reading', 'Gaming']);

//

function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}

const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterEvenNumbers(numbers);
// console.log(evenNumbers);

// -----------------------

async function fetchData(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// fetchData('https://jsonplaceholder.typicode.com/todos/1').then((data) =>
//   console.log(data)
// );

// -------------------------------------------------

type AnimalInterType = {
  name: string;
  sound: string;
};

interface AnimalInterface {
  name: string;
  sound: string;
}

class Animal implements AnimalInterType {
  name: string;
  sound: string;
  constructor(name: string, sound: string) {
    this.name = name;
    this.sound = sound;
  }

  makeSound() {
    console.log(`${this.name} says ${this.sound}`);
  }
}

class Dog extends Animal {
  breed: string;
  constructor(name: string, sound: string, breed: string) {
    super(name, sound);
    this.breed = breed;
  }

  getBreed() {
    return this.breed;
  }
}

const myDog = new Dog('Buddy', 'Woof', 'Golden Retriever');
// myDog.makeSound();
// console.log(myDog.getBreed());

// --------------------------------------

function calculate(operation: string, num1: number, num2: number) {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 === 0) {
        throw new Error('Cannot divide by zero');
      }
      return num1 / num2;
    default:
      throw new Error('Invalid operation');
  }
}

const result: number = calculate('add', 10, 5);
// console.log(result);

// -----------------------------
// BOOK LIST

function createBook(title: string, author: string, isPublished: boolean) {
  return {
    title: title,
    author: author,
    isPublished: isPublished,
  };
}

interface Book {
  title: string;
  author: string;
  isPublished: boolean;
}

const books: Book[] = [
  createBook('The Great Gatsby', 'F. Scott Fitzgerald', true),
  createBook('To Kill a Mockingbird', 'Harper Lee', false),
];

// console.log(books);

// ----------------------------
// Promise

type UserDataType = {
  id: number;
  name: string;
};
function getUserData(id: number): Promise<UserDataType> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}` });
      } else {
        reject('Invalid ID');
      }
    }, 1000);
  });
}

// getUserData(12)
//   .then((user: UserDataType) => console.log(user))
//   .catch((error) => console.error(error));

// ----------------------------------------------

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // Output: 8

// ------------------------------
