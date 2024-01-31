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
          <div class="movements__type movements__type--${type}">${i + 1} ${type}
            </div>
          <div class="movements__value">${mov}€</div>
        </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account2.movements);

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
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, el) {
    return acc + el;
  }, 0);
  // acc.balance  =  balance;
  labelBalance.textContent = `${acc.balance} €`;
};

// console.log(calcDisplayBalance(account1.movements));

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(function (deposits) {
      return deposits > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(function (withdrawal) {
      return withdrawal < 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumOut.textContent = Math.abs(`${out}`);
  //interest is: 1.2% (0.012) of the deposited amount

  const interest = movements
    .filter(function (deposits) {
      return deposits > 0;
    })
    .map(function (currentDeposit) {
      return currentDeposit * acc.interestRate;
    })
    .filter(function (int, i, arr) {
      console.log(arr);
      return int >= 1;
    })
    .reduce(function (acc, int) {
      return acc + int;
    }, 0);
  console.log(interest);

  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
};
//EVENT HANDLERS (LOGIN FEATURE)
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //Prevents form from submitting(prevents it from auto reloading)
  // console.log('Login');

  currentAccount = accounts.find(function (acct) {
    return acct.username === inputLoginUsername.value;
  });
  console.log(currentAccount);

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    //display UI and a welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!`;

    //Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    inputLoginPin.blur(); //makes the input field lose focus after successful login
    containerApp.style.opacity = 100;

    //Update UI
    updateUI(currentAccount);
  }
});

//IMPLEMENTING TRANFER FEATURES
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //prevents code from auto reloading

  const amount = Number(inputTransferAmount.value);
  const receiverAcct = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  //the code below checks if the amount to be sent is greater than 0 and if the current account balance is greater or equal to the amount to be sent, and also check if the receiver account actually exists before sending to it, then lastly, checks if the receiver account username is not the same as the account receiving the money.
  if (
    amount > 0 &&
    receiverAcct && //checks if the receiver account exists
    currentAccount.balance >= amount &&
    receiverAcct?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcct.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  console.log(amount, receiverAcct);
});

//LOAN FEATURE USING THE SOME METHOD
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(function(mov){
    return mov >= amount/10;
  })) {

    //Add the movement
    currentAccount.movements.push(amount)

    //update ui
    updateUI(currentAccount)

    //Clear input field
    inputLoanAmount.value = ''
  }
});

//USING THE FINDINDEX METHOD
//DELETE ACCOUNT

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    }); //finds the index of the found array (index to delete)
    // console.log(index)

    //DELETE ACCOUNT
    accounts.splice(index, 1);

    //HIDE UI
    containerApp.style.opacity = 0;
    console.log(accounts);
  }
});

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
console.log(deposit);
console.log(movements);

const withdrawals = movements.filter(mov => mov < 0);

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

////// CODING CHALLENGE 2

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(humanAges);

//   const adults = humanAges.filter(age => age >= 18);
//   console.log(adults);

//   const average =
//     adults.reduce(function (acc, age) {
//       return acc + age;
//     }, 0) / adults.length;
//   console.log(average);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(function (age) {
//     if (age <= 2) {
//       return 2 * age;
//     } else {
//       return 16 + age * 4;
//     }
//   });
//   console.log(humanAge);

//   const adults = humanAge.filter(function (age) {
//     return age >= 18;
//   });
//   console.log(adults);

//   const average =
//     adults.reduce(function (acc, age) {
//       return acc + age;
//     }, 0) / adults.length;
//   console.log(average);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

//CODING CHALLENGE 3 (rewriting the solution of the previous challenge using arrow function)
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// console.log(humanAge);
const ave1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(ave1);

//USING THE FIND METHOD: used to retrieve one element from an array based on a certain condition
const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});
console.log(movements);
console.log(firstWithdrawal); //returns the first element in the array that is greater than 0
console.log(accounts);

// //USING THE FOR OF LOOP METHOD AND THE FIND METHOD IN THE BANKIST PROJECT
// for (const acct of accounts) {
//   const owner = accounts.find(function (account) {
//     return account.owner === 'Sarah Smith';
//   });
//   console.log(owner);
// }

//SOME AND EVERY (ARRAY METHODS)
//THE SOME METHOD
console.log(movements);
console.log(movements.includes(-130));

const anyDeposit = movements.some(function (mov) {
  return mov >= 5000;
});
console.log(anyDeposit);

//THE EVERY METHOD (only returns true if all the element in the array satisfy the condition passed in)
console.log(account4.movements.every(function(mov){
return mov > 0
}))

//Separating callback functions to make code DRY
const depo = move => move > 0;
console.log(movements.every(depo));
console.log(movements)
console.log(movements.filter(depo));

//THE FLAT METHOD
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
const newArr = arr.flat();
console.log(newArr);

const accountMovements = accounts.map(function(acc){
  return acc.movements
});
console.log(accountMovements)

const allMovements = accountMovements.flat();
const overallBalance = allMovements.reduce(function(acc, mov){
  return acc + mov
}, 0);
console.log(allMovements)
console.log(overallBalance)

//THE FLATMAP METHOD
const accountMovements2 = accounts.flatMap(function(acc){
  return acc.movements
});
console.log(accountMovements2)
const overallBalance2 = accountMovements2.reduce(function(acc, mov){
  return acc + mov
}, 0);
console.log(accountMovements2)
console.log(overallBalance2)

//SORTING ARRAYS WITH STRINGS
const owners = ['Jonas', 'Prime', 'Adam', 'Martha'];
console.log(owners.sort())

//SORTING ARRAYS WITH NUMBERS
console.log(movements);
console.log(movements.sort());

