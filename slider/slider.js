const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const rightBtn = document.querySelector(".slider__btn--right");
const leftBtn = document.querySelector(".slider__btn--left");
let curSlide = 0;
let maxSlide = slides.length - 1;
slider.style.overflow = "hidden";

slides.forEach(function (slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`;
});

rightBtn.addEventListener("click", function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
});

leftBtn.addEventListener("click", function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
  
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  });
