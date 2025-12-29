// MENÚ
$(".burger i").on("click", function() {
  $(this).toggleClass("fa-bars fa-xmark");
  $("nav").toggleClass("menu-open");
});




// NEWSLETTER VALIDACIÓN

const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("newsletter-email");

const defaultPlaceholder = "Escribe tu email";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (email === "") {
    showError("Introduce tu email");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showError("Email no válido");
    return;
  }

  // OK
  emailInput.classList.remove("error");
  emailInput.placeholder = defaultPlaceholder;
  alert("¡Gracia's por suscribirte!");
  form.reset();
});

emailInput.addEventListener("input", () => {
  emailInput.classList.remove("error");
  emailInput.placeholder = defaultPlaceholder;
});

function showError(message) {
  emailInput.value = "";
  emailInput.classList.add("error");
  emailInput.placeholder = message;
}










// CURSOR
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

// Cursos efecto
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

// document.addEventListener("DOMContentLoaded", function () {
//   const header = document.querySelector(".navbar");
//   const threshold = window.innerHeight / 2;

//   window.addEventListener("scroll", function () {
//     if (window.scrollY > threshold) {
//       header.classList.add("shrink");
//     } else {
//       header.classList.remove("shrink");
//     }
//   });
// });

// menu hambuerguesa para el navbar
// lógica del menu (simplemente el clik en un icono)

// selección de elementos del html

// let burger = document.querySelector(".burger > i");
// let menu_opt = document.querySelector(".menu");

// definimos evneto click sobre le botón del menú
// burger.addEventListener("click", function () {
//   burger.classList.toggle("fa-bars");
//   burger.classList.toggle("fa-times");
//   menu_opt.classList.toggle("menu-show");
// });




