// MENÚ
$(".burger i").on("click", function () {
  $(this).toggleClass("fa-bars fa-xmark");
  $("nav").toggleClass("menu-open");
});

// NEWSLETTER VALIDACIÓN
const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("newsletter-email");

if (form && emailInput) {
  const defaultPlaceholder = "Escribe tu email";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      showError("Introduce tu email");
      return;
    }

    if (!emailRegex.test(email)) {
      showError("Email no válido");
      return;
    }

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

// GIRO 3D POR CLICK
$(".news-card").on("click", function () {
  $(this).toggleClass("flip");
});
