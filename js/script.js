// MENÚ
$(".burger i").on("click", function () {
  $(this).toggleClass("fa-bars fa-xmark");
  $("nav").toggleClass("menu-open");
});

// NEWSLETTER
const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("newsletter-email");
const defaultPlaceholder = "Escribe tu email";

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) return showError("Introduce tu email");
    if (!emailRegex.test(email)) return showError("Email no válido");

    emailInput.classList.remove("error");
    emailInput.placeholder = defaultPlaceholder;
    alert("¡Gracias por suscribirte!");
    form.reset();
  });
}

function showError(message) {
  emailInput.value = "";
  emailInput.classList.add("error");
  emailInput.placeholder = message;
}

// CURSOR
$(document).mousemove(function (e) {
  $(".cursor").css({
    left: e.clientX,
    top: e.clientY,
  });
});

$("a").hover(
  () => $(".cursor").addClass("cursor-grow"),
  () => $(".cursor").removeClass("cursor-grow")
);

// HOME – ANIMACIONES AL SCROLL

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => observer.observe(el));
});
