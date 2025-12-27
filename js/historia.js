// efectos para el cursor

$(document).mousemove(function (e) {
  $(".cursor").css({
    left: e.clientX + "px",
    top: e.clientY + "px",
  });
});

document.addEventListener("mousemove", (e) => {
  const el = document.querySelector(".cursor");
  if (!el) return;
  el.style.left = e.clientX + "px";
  el.style.top = e.clientY + "px";
});

// opcional: efecto al pasar por enlaces
$("a").hover(
  function () {
    $(".cursor").addClass("cursor-grow");
  },
  function () {
    $(".cursor").removeClass("cursor-grow");
  }
);

// HEADER

// efecto disminuir head al hacer scroll

/*jslint devel: true*/
/*eslint-env browser*/

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".navbar");
  const threshold = window.innerHeight / 2;

  window.addEventListener("scroll", function () {
    if (window.scrollY > threshold) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });
});

// menu hambuerguesa para el navbar
// lógica del menu (simplemente el clik en un icono)

// selección de elementos del html

let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector(".menu");

// definimos evneto click sobre le botón del menú
burger.addEventListener("click", function () {
  burger.classList.toggle("fa-bars");
  burger.classList.toggle("fa-times");
  menu_opt.classList.toggle("menu-show");
});
