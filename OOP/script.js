"use strict";

// CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR
// Arrow functions does not work for constructor functions
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function (Bad Practice)
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// The above constructor function now acts as the blueprint of a house, and with the blueprint set, other houses can be created based on the existing blueprint. Just like the new objects (matilda and jack) created below.

const Isaac = new Person("Isaac", 2003); // The actual house created (constructor function)
console.log(Isaac);

// 1. New empty object () is created
// 2. function is called, this = {}
// 3. { } linked to a prototype
// 4. function automatically returns that empty object from the beginning

// Instances created from the above class Person.
const matilda = new Person("Maltida", 2017);
// const jack = new Person("Jack", 2019);
// const prime = new Person("Prime", 1990);
// console.log(prime);
// console.log(matilda);
// console.log(jack);

//test whether an object is an instance of a particular class, returns true or false
// console.log(matilda instanceof Person)

// PROTOTYPES.
// Each and every function in javascript automatically has a property called prototype, and that includes constructor functions. Instead of adding methods directly in to the constructor function, we use prototypes.
Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};
matilda.calcAge();

//two ways to check if an object is tbe prototype of a particular constructor
// console.log(Isaac.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(Isaac));

// we can also set properties on prototypes.
Person.prototype.gender = "Male";
console.log(Isaac, matilda);

// Prototype chains on built in objects like arrays
const arr = [3, 4, 5, 6, 7, 9];
// console.log(arr.__proto__ === Array.prototype);

//Adding a new method to the prototype property of the array constructor
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

//Coding challenge 1
// const Car = function (make, speed) {
//   this.make = make
//   this.speed = speed
// }
// Car.prototype.accelerate = function () {
//   this.speed += 10
//   console.log(`${this.make} is going at ${this.speed} km/hr`)
// }

// Car.prototype.brake = function () {
//   this.speed -= 5
//   console.log(`${this.make} is going at ${this.speed} km/hr`)
// }
// const  BMW = new Car('BMW', 120)
// const mercedes = new Car('Mercedes', 95)
// console.log(BMW, mercedes)
// BMW.accelerate()
// BMW.brake()

// mercedes.accelerate()
// mercedes.brake()

// ES6 CLASSES
// creating a constructor function using CLASSES
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`hey ${this.firstName}`);
  }
}
const jessica = new PersonCl("Jessica", 1990);
console.log(jessica);
jessica.calcAge();
jessica.greet();

// Setters and Getters
// Using the getter property to get the last value in an Array
const account = {
  name: "Jonas",
  movements: [20, 40, 90, 100, 230],

  get lastMove() {
    return this.movements.slice(-1).pop();
  },
};
console.log(account.lastMove);

// using tbe Setters
const account2 = {
  name: "Prime",
  movements: [20, 30, 90, 100, 450],
  set lastMove(move) {
    this.movements.push(move);
  },
};
account2.lastMove = 1020;
console.log(account2.movements);

//Object.create method
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const stephen = Object.create(PersonProto);
stephen.name = "Stephen";
stephen.birthYear = 2003;

stephen.calcAge();

const sarah = Object.create(PersonProto);
sarah.init("sarah", 1990);

//Coding challenge 2
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
  }

  get speedUs() {
    return `${this.make} is going at ${(this.speed /= 1.6)} mi/hr`;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const BMW = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);
console.log(BMW, mercedes);
BMW.accelerate();
BMW.brake();

const ford = new Car("Ford", 120);
console.log(ford.speedUs);

ford.speedUs = 75;
console.log(ford);

mercedes.accelerate();
mercedes.brake();


// Inheritance between classes: constructor function
const Personn = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Personn.prototype.calcAge = function () {
  console.log(2037 - this.birthYear)
}
// Child Constructor
const Student = function (firstName, birthYear, course) {
  Personn.call(this, firstName, birthYear);
  this.course = course
}

// Linking parent prototype with the child prototype
Student.prototype = Object.create(Personn.prototype)

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`)
}

const mike = new Student ("Mike", 2002, 'Computer Sciencce')
console.log(mike)
mike.introduce()
mike.calcAge()

// Coding challenge 3
const Carr = function (make, speed) {
   this.make = make
this.speed = speed
 }
 
 const EV = function (make, speed, charge) {
   Carr.call(this, make, speed);
   this.charge = `${charge}`
 }
 
 EV.prototype = Object.create(Carr.prototype)
 
 EV.prototype.chargeBattery = function(chargeTo){
   this.charge = chargeTo

 }
 
 EV.prototype.accelerate = function () {
   this.speed += 20
   this.charge--
  console.log(`${this.make} going at ${this.speed} km/hr with a charge of ${this.charge}%`)
}

const tesla = new EV ("Tesla",120,22)
// console.log (tesla)
tesla.accelerate()
tesla.accelerate()
tesla.chargeBattery(22)
console.log(tesla)