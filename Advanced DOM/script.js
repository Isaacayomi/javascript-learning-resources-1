'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Instead of using the for loop, we use the forEach method
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////
//Selecting Element
/*
console.log(document.documentElement); //to select the entire document of any webpage
console.log(document.head); //to select the head section of any webpage
console.log(document.body); //to select the body of the webpage

const header = document.querySelector('.header'); // to select a single element with the className
const allSection = document.querySelectorAll('.section'); //to select multiple elements with the same className
console.log(allSection);

document.getElementById('section-1'); //to select an element with the idName
const allButtons = document.getElementsByTagName('button'); //to select all elements by their tag name
console.log(allButtons);

document.getElementsByClassName('btn'); //to select element with class names

//Creating and Inserting elements
// .insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `Use cookies for improved functionality and analytics <button class="btn btn-close-cookie">Got it! </button>`;

header.insertAdjacentElement('beforebegin', message); // beforebegin, afterbegin, beforened, afterend

//To insert the newly created elements in the DOM
// header.prepend(message); //inserts the newly created element as the first child of the header element

// header.append(message) //adds the created element as the last child of the header element

// header.before(message); //Adds the new element before the header element
// header.after(message); //Adds the new element after the header element

// Deleting Elements
document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//////// Styles, Attributes and Classes
// STYLES
message.style.backgroundColor = 'darkblue'; //to add css styles
message.style.width = '120%';

//to get the styles used on an element
console.log(getComputedStyle(message).fontSize);

//to add more values to a certain property, e.g font-size
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

//Working with CSS custom properties (CSS variables), changing the css custom variable property using javascript
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//ATTRIBUTES
// Standard
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.id);

// Another example on attribute
// To get the href value of an anchor tag
const navLink = document.querySelector('.nav__link');
console.log(navLink);

console.log(navLink.getAttribute('href'));

//to set another value for the attributes read
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

//Non-standard
// console.log(logo.getAttribute('designer'));

console.log(logo.src); // gets the absolute location
console.log(logo.getAttribute('src')); //to get the relative location of an attribute;

// CLASSES
// logo.classList.add('c'); // to add classname
// logo.classList.remove(v); // to remove classname
// logo.classList.toggle('c');
// logo.classList.contains('s'); // chekcs if the logo element contains the 's' class
*/
// IMPLEMENTING SMOOTH SCROLLING
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // Getting the coordinates of the elements to scroll to
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // Getting the coordinates of the button clicked (btnScrollTo)
  console.log(e.target.getBoundingClientRect());

  // Getting the current scroll positon (X/Y positions)
  console.log('Current scroll [x/y]', window.pageXOffset, window.pageYOffset);

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   window.pageYOffset + s1coords.top
  // );

  // Scrolling and making the animation nice and smooth
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: window.pageYOffset + s1coords.top,
  //   behavior: 'smooth',
  // });

  // Modern way of scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Using the mouseenter event listener
const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// });

// another way of attaching an event listener to an element (old fashioned)
// h1.onmouseenter = function (e) {
//   alert('Hii :D');
// };

// Removing Event Listeners
const alertHi = function (e) {
  alert('Hi : D');

  // Let's say, to remove event listener after 5 seconds
  setTimeout(() => {
    h1.removeEventListener('mouseenter', alertHi);
  }, 3000);
};
h1.addEventListener('mouseenter', alertHi);

let time = 0;

const setInt = setInterval(() => {
  time++;
  console.log(time);
  if (time === 100) {
    clearInterval(setInt);
  }
}, 10);
