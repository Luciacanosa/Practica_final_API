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

// CÓCTELES BOTÓN SORPRÉNDEME
const randomBtn = document.getElementById("randomBtn");
const cocktailName = document.getElementById("cocktail-name");
const cocktailImg = document.getElementById("cocktailImg");
const cocktailIngredients = document.getElementById("cocktail-ingredients");
const cocktailInstructions = document.getElementById("cocktail-instructions");

// SELECCIÓN 10 CÓCTELES
const ALLOWED_COCKTAILS = [
  "17209", // Barracuda
  "14446", // Kool-Aid
  "17228", // Addison
  "17836", // Acapulco
  "11288", // Cuba Libre
  "178333", // Raspberry Julep
  "11580", // John Collins
  "12420", // Tuxedo
  "17247", // The Last Word
  "11375", // Foxy Lady
];

// URL IMG FONDO
const cocktailImages = {
  17209: "../img/barrucada.jpg",
  14446: "../img/koolaid.jpg",
  17228: "../img/addison.jpg",
  17836: "../img/acapulco.jpg",
  11288: "../img/cuba_libre.jpg",
  178333: "../img/berry_julep.jpg",
  11580: "../img/john_collins.jpg",
  12420: "../img/tuxedo.jpg",
  17247: "../img/last_word.jpg",
  11375: "../img/foxy_lady.jpg",
};

randomBtn.addEventListener("click", getRandomCocktail);

function getRandomCocktail() {
  const randomId =
    ALLOWED_COCKTAILS[Math.floor(Math.random() * ALLOWED_COCKTAILS.length)];

  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomId}&lang=es`
  )
    .then((res) => res.json())
    .then((data) => showCocktail(data.drinks[0]));
}

function showCocktail(drink) {
  cocktailName.textContent = drink.strDrink;

  // Asignar la imagen con el fondo ya incluido
  const cocktailImage =
    cocktailImages[drink.idDrink] || "img/default_with_background.jpg"; // Imagen por defecto
  cocktailImg.src = cocktailImage;

  cocktailIngredients.innerHTML = "";
  const instructions = drink.strInstructionsES || drink.strInstructions;
  cocktailInstructions.textContent = instructions;

  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const mea = drink[`strMeasure${i}`];
    if (ing) {
      const li = document.createElement("li");
      li.textContent = `${mea ?? ""} ${ing}`;
      cocktailIngredients.appendChild(li);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getRandomCocktail(); // Cargar un cóctel aleatorio cuando la página se carga
});
