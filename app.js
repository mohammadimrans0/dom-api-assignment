// meals API
const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

// Fetching the data from meal db
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    displayMeals(data.categories);
    searchMeal(data.categories);
  });

// Limiting the description
const limitingDescription = (text, maxWords) => {
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

// Display all meals
const displayMeals = (mealData) => {
  const container = document.getElementById("meal-data");
  container.innerHTML = "";

  mealData.forEach((meal) => {
    const shortDescription = limitingDescription(meal.strCategoryDescription, 30);

    const mealDiv = document.createElement("div");
    mealDiv.className = "mb-3 p-3 border text-center";
    mealDiv.style.width = "300px";

    mealDiv.innerHTML = `
            <img src="${meal.strCategoryThumb}" alt="${meal.strCategory}" class="img-fluid mb-2" />
            <h3>${meal.strCategory}</h3>
            <p>${shortDescription}</p>
            <span class="d-flex justify-content-center gap-4">
                <button
                    type="button"
                    class="btn btn-primary details-button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-meal-id="${meal.idCategory}">
                        Details
                </button>

                <button type="button" class="btn btn-info order-button">Order</button>
            </span>
        `;

    const orderButton = mealDiv.querySelector(".order-button");
    orderButton.addEventListener("click", () => addOrder(meal.strCategory));

    const detailsButton = mealDiv.querySelector('.details-button');
    detailsButton.addEventListener('click', () => mealDetails(meal.idCategory, mealData));


    container.appendChild(mealDiv);
  });
};

// Detalis Modal
const mealDetails = (mealId, mealData) => {
  const selectedMeal = mealData.find((meal) => meal.idCategory === mealId);

  if (selectedMeal) {
    const modalTitle = document.getElementById("exampleModalLabel");
    const modalBody = document.querySelector(".modal-body");

    if (modalTitle && modalBody) {
        modalTitle.textContent = selectedMeal.strCategory;
        modalBody.innerHTML = `
            <img src="${selectedMeal.strCategoryThumb}" alt="${selectedMeal.strCategory}" class="img-fluid mb-3" />
            <p>${selectedMeal.strCategoryDescription}</p>
        `;
    }
  } else {
    console.error("Meal not found:", mealId);
  }
};

// Search Meal
const searchMeal = (mealData) => {
  const searchInput = document.getElementById("search-meal");
  const searchButton = document.getElementById("get-meal");

  searchButton.addEventListener("click", () => {
    const searchText = searchInput.value.trim().toLowerCase();
    const filteredMeals = mealData.filter((meal) =>
      meal.strCategory.toLowerCase().includes(searchText)
    );

    if (filteredMeals.length > 0) {
      displayMeals(filteredMeals);
    } else {
      document.getElementById("meal-data").innerHTML = `
                <p class="text-danger text-center w-100">No meals found for "${searchText}"</p>
            `;
    }
  });
};

// Add Order
let totalOrders = 0;

const addOrder = (mealName) => {
  const orderContainer = document.getElementById("order-data");

  totalOrders++;

  let orderCountElement = document.getElementById("order-count");
  if (!orderCountElement) {
    orderCountElement = document.createElement("h2");
    orderCountElement.id = "order-count";
    orderCountElement.className = "text-info";
    orderContainer.prepend(orderCountElement);
  }
  orderCountElement.textContent = `Total Orders: ${totalOrders}`;

  const orderItem = document.createElement("h4");
  orderItem.className = "text-black";
  orderItem.textContent = mealName;
  orderContainer.appendChild(orderItem);
};
