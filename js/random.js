const randomBtn = document.getElementById("randomBtn");
const pdfBtn = document.getElementById("pdfBtn");
const backBtn = document.getElementById("backBtn");

const cocktailName = document.getElementById("cocktail-name");
const cocktailImg = document.getElementById("cocktailImg");
const cocktailIngredients = document.getElementById("cocktail-ingredients");
const cocktailInstructions = document.getElementById("cocktail-instructions");

// IDs permitidos
const ALLOWED_COCKTAILS = [
  "17209", // Barracuda
//   "17193", // Stinger
  "17228", // Addison
  "17836", // Acapulco
  "11288", // Cuba Libre
//   "12434", // Valencia Cocktail
  "11580", // John Collins
//   "14195", // Snowball
  "17247", // The Last Word
  "11375", // Foxy Lady
];

randomBtn.addEventListener("click", getRandomCocktail);

backBtn.addEventListener("click", () => {
  window.history.back();
});

function getRandomCocktail() {
  const randomId =
    ALLOWED_COCKTAILS[Math.floor(Math.random() * ALLOWED_COCKTAILS.length)];
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomId}&lang=es`)
    .then(res => res.json())
    .then(data => showCocktail(data.drinks[0]));
}

function showCocktail(drink) {
  cocktailName.textContent = drink.strDrink;
  cocktailImg.src = `images/cocktails/${drink.idDrink}.jpg`;
  cocktailIngredients.innerHTML = "";

//   cocktailInstructions.textContent = drink.strInstructions;
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

  fillPDF(drink);

  pdfBtn.style.display = "inline-block";
  pdfBtn.onclick = () => generatePDF(drink.strDrink);
}

function fillPDF(drink) {
  document.getElementById("pdfTitle").textContent = drink.strDrink;
  document.getElementById("pdfImage").src = cocktailImg.src;

  const list = document.getElementById("pdfIngredients");
  list.innerHTML = "";

  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const mea = drink[`strMeasure${i}`];
    if (ing) {
      const li = document.createElement("li");
      li.textContent = `${mea ?? ""} ${ing}`;
      list.appendChild(li);
    }
  }

  document.getElementById("pdfInstructions").textContent =
    drink.strInstructions;
}

function generatePDF(name) {
  html2pdf()
    .from(document.getElementById("pdfTemplate"))
    .set({
      margin: 0.5,
      filename: `${name.replaceAll(" ", "_")}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4" }
    })
    .save();
}













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