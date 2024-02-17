const nav = document.querySelectorAll(".nav__link");

nav.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("LINK");

    const id = this.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
