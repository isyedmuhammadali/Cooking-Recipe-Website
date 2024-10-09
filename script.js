let allRecipes = [];

const fetchRecipes = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s"
    );
    const data = await response.json();
    allRecipes = data.meals;
    displayRecipes(allRecipes);
  } catch (error) {
    console.error("Error fetching the recipe data:", error);
  }
};

const displayRecipes = (recipes) => {
  const CheckrecipeContainer = document.querySelector(".dishItem");
  if (CheckrecipeContainer) {
    CheckrecipeContainer.remove();
  }

  const recipeContainer = document.createElement("div");
  recipeContainer.classList.add("dishItem");

  const container = document.getElementById("midContainer");
  container.appendChild(recipeContainer);

  recipes.forEach((recipe) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("CatoImage");

    const recipeImg = document.createElement("img");
    recipeImg.src = recipe.strMealThumb;
    recipeImg.classList.add("recipe-image");
    recipeImg.addEventListener("click", () => showRecipeDetails(recipe));

    const recipeTitle = document.createElement("h3");
    recipeTitle.classList.add("dishtitle");
    recipeTitle.innerText = recipe.strMeal;

    recipeDiv.appendChild(recipeImg);
    recipeDiv.appendChild(recipeTitle);

    recipeContainer.appendChild(recipeDiv);
  });
};

const filterRecipes = () => {
  const searchInput = document.getElementById("searchCat").value.toLowerCase();
  if (searchInput === "") {
    displayRecipes(allRecipes);
  } else {
    const filteredRecipes = allRecipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(searchInput)
    );
    displayRecipes(filteredRecipes);
  }
};

document.getElementById("searchBtn").addEventListener("click", filterRecipes);
document.getElementById("searchCat").addEventListener("input", filterRecipes);

const showRecipeDetails = (recipe) => {
  const recipeDetails = document.getElementById("recipeUI");
  recipeDetails.classList.remove("hide");
  document.getElementById("mainUI").classList.add("hide");

  document.getElementById("recipeTitle").textContent = recipe.strMeal;
  document.getElementById("recipeImg").src = recipe.strMealThumb;
  document.getElementById("instructions").textContent = recipe.strInstructions;

  const ingredientList = document.getElementById("Ingredients");
  ingredientList.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      const listItem = document.createElement("li");
      listItem.classList.add("listUI");
      listItem.innerText = ` ${ingredient}....${measure}`;
      ingredientList.appendChild(listItem);
    }
  }
};

document.getElementById("closebtn").addEventListener("click", () => {
  const recipeDetails = document.getElementById("recipeUI");
  recipeDetails.classList.add("hide");
  document.getElementById("mainUI").classList.remove("hide");
});

fetchRecipes();
