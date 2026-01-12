// MENÚ
$(".burger i").on("click", function () {
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

// ANIMACIÓN AL SCROLL
document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;

  const items = document.querySelectorAll(".container");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        timeline.classList.add("animate");

        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("show");
          }, index * 300);
        });

        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(timeline);
});

// SLIDER SLICK
$(".slick-history").slick({
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  dots: true,
  fade: true,
  pauseOnHover: false,
  adaptiveHeight: true,
});

$(document).ready(function () {
  $(".slick-history").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    pauseOnHover: false,
  });
});

$(window).on("resize", function () {
  $(".slick-history").slick("setPosition");
});
