const nav = document.querySelectorAll(".nav__link");
const navContainer = document.querySelector(".nav__links");
const section1 = document.querySelector(".section--1");
const section = document.querySelector("section");

// const navContainer = document.querySelector(".nav__links");

// nav.forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("LINK");

//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Using event delegation
// First, select the parent container
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //if the current element clicked contains the class nav__link
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Implementing Sticky Navigation
const coordinates = section1.getBoundingClientRect();
window.addEventListener("scroll", function (e) {
  // console.log(coordinates);

  if (this.scrollY > coordinates.top) {
    navContainer.classList.add("sticky");
  } else {
    navContainer.classList.remove("sticky");
  }
});
