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

const Isaac = new Person("Isaac", 2003); // The actual house created
console.log(Isaac);

// 1. New empty object () is created
// 2. function is called, this = {}
// 3. { } linked to a prototype
// 4. function automatically returns that empty object from the beginning

// Instances created from the above class Person.
const matilda = new Person("Maltida", 2017);
const jack = new Person("Jack", 2019);
const prime = new Person("Prime", 1990);
console.log(prime)
console.log(matilda);
console.log(jack);
