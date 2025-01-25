"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function createUserProfile(name, age, hobbies) {
    return {
        name: name,
        age: age,
        hobbies: hobbies,
    };
}
const userProfile = createUserProfile('John Doe', 25, ['Reading', 'Gaming']);
//
function filterEvenNumbers(numbers) {
    return numbers.filter((num) => num % 2 === 0);
}
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterEvenNumbers(numbers);
// console.log(evenNumbers);
// -----------------------
function fetchData(apiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(apiUrl);
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }
    makeSound() {
        console.log(`${this.name} says ${this.sound}`);
    }
}
class Dog extends Animal {
    constructor(name, sound, breed) {
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
function calculate(operation, num1, num2) {
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
const result = calculate('add', 10, 5);
// console.log(result);
// -----------------------------
// BOOK LIST
function createBook(title, author, isPublished) {
    return {
        title: title,
        author: author,
        isPublished: isPublished,
    };
}
const books = [
    createBook('The Great Gatsby', 'F. Scott Fitzgerald', true),
    createBook('To Kill a Mockingbird', 'Harper Lee', false),
];
function getUserData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `User ${id}` });
            }
            else {
                reject('Invalid ID');
            }
        }, 1000);
    });
}
// getUserData(12)
//   .then((user: UserDataType) => console.log(user))
//   .catch((error) => console.error(error));
// ----------------------------------------------
function fibonacci(n) {
    if (n <= 1)
        return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(6)); // Output: 8
// ------------------------------
