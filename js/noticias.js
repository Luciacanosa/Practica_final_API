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
// Interacción opcional para "Leer más"
$(".read-more").on("click", function (e) {
  e.preventDefault();
  alert(
    "Esta funcionalidad puede abrir una ventana modal o redirigir a una noticia completa."
  );
});
// MOSTRAR TEXTO EXTRA AL HACER CLICK
$(".news-card").on("click", function () {
  const extra = $(this).find(".news-extra");

  // Si está cerrado → abrir
  if (extra.css("max-height") === "0px") {
    extra.css("max-height", "300px");
  } else {
    extra.css("max-height", "0px");
  }
});

// OCULTAR TEXTO EXTRA AL SALIR DEL CUADRADO
$(".news-card").on("mouseleave", function () {
  $(this).find(".news-extra").css("max-height", "0px");
});
