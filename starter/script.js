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
console.log(document.documentElement); //to select the entire document of any webpage
console.log(document.head); //to select the head section of any webpage
console.log(document.body); //to select the body of the webpage

document.querySelector('.header'); // to select a single element with the className 
const allSection = document.querySelectorAll('.section'); //to select multiple elements with the same className 
console.log(allSection)

document.getElementById('section-1') //to select an element with the idName
const allButtons = document.getElementsByTagName('button')
console.log(allButtons)