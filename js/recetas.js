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

$(document).ready(function () {
  // Las categorías que queremos mostrar
  const validCategories = {
    Cocktail: [
      "Martini",
      "Absolut Summertime",
      "Aperol Spritz",
      "Bora Bora",
      "Mojito",
      "Bacardi Cocktail",
    ],
    "Ordinary Drink": [
      "Daiquiri",
      "Caipirinha",
      "Bloody Mary",
      "Classic Old-Fashioned",
      "Americano",
    ],
    Shot: ["747", "Lemon Shot", "Baby Guinness", "B-52", "Tequila Slammer"],
  };

  // Definir las imágenes que usarás para cada cóctel
  const cocktailImages = {
    // Cocktail
    "Absolut Summertime": "img/cocktail/absolut_summertime.webp",
    "Aperol Spritz": "img/cocktail/aperol_spritz.webp",
    "Bora Bora": "img/cocktail/bora_bora.webp",
    Martini: "img/cocktail/martini.webp",
    Mojito: "img/cocktail/mojito.webp",

    // Ordinary Drink
    Americano: "img/ordinary/americano.webp",
    "Bloody Mary": "img/ordinary/bloody_mary.webp",
    Caipirinha: "img/ordinary/caipirinha.webp",
    "Classic Old-Fashioned": "img/ordinary/old_fashioned.webp",

    // Shot
    747: "img/shot/747.webp",
    "B-52": "img/shot/B_52.webp",
    "Baby Guinness": "img/shot/baby_guinness.webp",
    "Lemon Shot": "img/shot/lemon_shot.webp",
    "Tequila Slammer": "img/shot/tequila_slammer.webp",

    // 'Bacardi Cocktail': 'img/bacardi_cocktail.webp',
    // 'Daiquiri': 'img/daiquiri.webp',
  };

  // Obtener las categorías de la API
  $.get(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
    function (data) {
      const categories = data.drinks;

      // Filtrar las categorías y mostrar solo las categorías relevantes
      categories.forEach((category) => {
        if (validCategories[category.strCategory]) {
          $(".categories").append(
            `<button class="category-btn" data-category="${category.strCategory}">${category.strCategory}</button>`
          );
        }
      });

      // Seleccionamos automáticamente una categoría al cargar la página
      const defaultCategory = "Cocktail";
      $(".category-btn").each(function () {
        if ($(this).data("category") === defaultCategory) {
          $(this).addClass("selected");
          fetchCocktailsByCategory(defaultCategory);
        }
      });
    }
  );

  // Mostrar las bebidas de una categoría
  function fetchCocktailsByCategory(category) {
    $.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
      function (data) {
        const cocktails = data.drinks;
        $(".cocktails").empty();

        // Filtrar bebidas según las categorías específicas
        const validCocktails = cocktails.filter((cocktail) =>
          validCategories[category].includes(cocktail.strDrink)
        );

        // Mostrar las bebidas válidas
        validCocktails.forEach((cocktail) => {
          const cocktailName = cocktail.strDrink;
          const cocktailImage =
            cocktailImages[cocktailName] || "img/default.webp";

          $(".cocktails").append(
            `<div class="cocktail" data-category="${category}">
            <img src="${cocktailImage}" alt="${cocktailName}">
            <h3>${cocktailName}</h3>
          </div>`
          );
        });

        // Inicializar Isotope después de cargar las bebidas
        $(".cocktails").isotope({
          itemSelector: ".cocktail",
          layoutMode: "fitRows",
        });
      }
    );
  }

  // Cuando se hace clic en un botón de categoría
  $(".categories").on("click", ".category-btn", function () {
    const category = $(this).data("category");
    fetchCocktailsByCategory(category);

    // Eliminar la clase 'selected' de todos los botones
    $(".category-btn").removeClass("selected");

    // Añadir la clase 'selected' al botón clickeado
    $(this).addClass("selected");
  });

  // Función para filtrar por bebida aleatoria
  // $('#randomBtn').click(function(e) {
  //   e.preventDefault();
  //   $.get("https://www.thecocktaildb.com/api/json/v1/1/random.php", function(data) {
  //     const cocktail = data.drinks[0];
  //     $(".cocktails").empty().append(
  //       `<div class="cocktail">
  //         <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
  //         <h3>${cocktail.strDrink}</h3>
  //       </div>`
  //     );
  //   });
  // });
});

$.get(
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail",
  function (data) {
    console.log(data); // Verifica que la respuesta sea correcta
  }
);
