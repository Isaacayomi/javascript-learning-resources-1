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
matilda.calcAge()

//two ways to check if an object is tbe prototype of a particular constructor
console.log(Isaac.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(Isaac))

// we can also set properties on prototypes.
Person.prototype.gender = 'Male';
console.log(Isaac, matilda);

// Prototype chains on built in objects like arrays
const arr = [3, 4, 5, 6, 7, 9];
console.log(arr.__proto__ === Array.prototype);



