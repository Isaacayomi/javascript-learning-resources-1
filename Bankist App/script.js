'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
// console.log(containerMovements)

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//USING THE FOREACH METHOD
const displayMovements = function (movements) {
  containerMovements.innerHTML = ' '; //Empty the movement container
  movements.forEach(function (mov, i) {
    //Remember, forEach loop actually accepts three arguements which are the current element of the array, the index and the entire array

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${Math.abs(mov)}</div>
        </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account2.movements);

//USING THE MAP METHOD
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
  console.log(accs);
};
createUsernames(accounts);

//USING THE DISPLAY METHOD TO CALCULATE THE TOTAL BALANCE
const calcDisplayBalance = function(movements) {
  const balance = movements.reduce(function(acc, el) {
    return acc + el
  }, 0)
labelBalance.textContent = `${balance} EURO`
};

console.log('Total array balance: ')
console.log(calcDisplayBalance(account1.movements))
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////

////////////// CODING CHALLENGE 1
//TEST DATA: Julia's data [9,16,6,8,3], Kate's data [10, 5, 6, 1, 4]

/*
const checkDogs = function(dogsJulia, dogsKate) {
const juliaShallowCopy = [...dogsJulia] //Creating a shallow copy of the original array
const juliaCopy = juliaShallowCopy.slice(0,-2);
juliaCopy.splice(0,1); //Removes the first element in the shallowcopy created and this changes the array

const correctedData = [...juliaCopy, ...dogsKate];

correctedData.forEach(function(dogAge, i) {

  const age = dogAge >= 3? "an adult" : "a puppy";
  
  console.log(`Dog number ${i + 1} is ${age} and it is ${dogAge} years old`);
})
}

checkDogs([9,16,6,8,3], [10, 5, 6, 1, 4]) */

//THE MAP METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

//USING THE FILTER METHOD
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
console.log('New arrays are: ');
console.log(deposit);
console.log(movements);

const withdrawals = movements.filter(mov => mov < 0);

console.log('Withdrawals are: ');
console.log(withdrawals);

//USING THE REDUCE METHOD: we use the reduce method to basically boil down all the elements in an array into one single value

const balance = movements.reduce(function (acc, curr, i, arr) {
  console.log(`iteration ${i}: ${acc} + ${curr}`);
  return acc + curr;
}, 0);
console.log(`Balance is ${balance}`);

const arrs = [300, 900, 500];
let tots = 0;

for (const el of arrs) {
  tots += el;
}
console.log('Total arr is: ');
console.log(tots);

/*
const movementsUSD = movements.map(function(mov){
  return mov * eurToUsd;
})
console.log(`${movementsUSD}`);
console.log(movements); */

//USING THE ARROW FUNCTION
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movementsUSD);
console.log(movements);

// const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movements)
// console.log(movementsUSD)
