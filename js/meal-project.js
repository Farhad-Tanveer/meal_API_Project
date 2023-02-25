const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeal(data.meals.slice(0, 4))); // when first start the function it will show 4 meals card
};
const displayMeal = (meals) => {
  //document.getElementById("search-field").value = ""; // empty the input field after search anything
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = ""; // after click the show all button it will remove all previous data from innerHTML
  meals.forEach((meal) => {
    // console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 500px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional
                                content. This content is a little bit longer.</p>
                                <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealsDetailsModal">
                                Details
                                </button>
                        </div>
                    </div>
                </div>
            </div>
    `;
    mealsContainer.appendChild(mealDiv);
  });
};

const loadMealDetails = (id) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showSingleMealDetails(data.meals[0]))
    .catch((error) => console.log(error));
};

const showSingleMealDetails = (meal) => {
  console.log(meal);
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strYoutube,
  } = meal;
  const mealsDetailsLabel = document.getElementById("mealsDetailsBody");
  const mealTile = document.getElementById("title");
  mealsDetailsBody.innerHTML = `
        <img class="w-100 rounded-3" src="${strMealThumb}">
        <h6>Catagory: <span class="fw-light fs-6">${strCategory}</span></h6>
        <h6>Area: <span class="fw-light fs-6">${strArea}</span></h6>
        
        <h6>Introduction: <span class="fw-light fs-6">${strInstructions.slice(
          0,
          150
        )}</span></h6>
        <h6>YouTube: <a class="fw-light fs-6 text-decoration-none" href="${strYoutube}">${strYoutube}</a></h6>
    `;
  mealTile.innerHTML = `
    <h2 class="modal-title font-bold" id="mealsDetailsLabel">${strMeal}</h2>
    `;
};

// search function
const searchMeals = () => {
  const searchText = document.getElementById("search-field").value;
  //   console.log(searchText);
  loadMeals(searchText);
};

loadMeals("fish");

// show all button
// when we click this it call the function with the full data
const showFullData = () => {
  const searchText = document.getElementById("search-field").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeal(data.meals));
};
