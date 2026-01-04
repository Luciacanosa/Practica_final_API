const randomBtn = document.getElementById("randomBtn");
const cocktailName = document.getElementById("cocktail-name");
const cocktailImg = document.getElementById("cocktailImg");
const cocktailIngredients = document.getElementById("cocktail-ingredients");
const cocktailInstructions = document.getElementById("cocktail-instructions");

// IDs permitidos
const ALLOWED_COCKTAILS = [
//   "17209", 
//   "14446", 
//   "17228", 
  "17836", 
//   "11288", 
//   "178333", 
//   "11580", 
//   "12420", 
//   "17247", 
//   "11375",
];

// URL de las imágenes con fondo ya incluido
const cocktailImages = {
  "17836": "../img/fin.jpg",  // Usa la imagen con fondo incluido
  // Agrega más imágenes de cócteles con fondo aquí
};

randomBtn.addEventListener("click", getRandomCocktail);

function getRandomCocktail() {
  const randomId = ALLOWED_COCKTAILS[Math.floor(Math.random() * ALLOWED_COCKTAILS.length)];

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomId}&lang=es`)
    .then(res => res.json())
    .then(data => showCocktail(data.drinks[0]));
}

function showCocktail(drink) {
  cocktailName.textContent = drink.strDrink;
  
  // Asignar la imagen con el fondo ya incluido
  const cocktailImage = cocktailImages[drink.idDrink] || 'img/default_with_background.jpg'; // Imagen por defecto
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
