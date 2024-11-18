// meals API
const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

// Fetch and initialize
fetch(url)
  .then(response => response.json())
  .then(data => {
      displayMeals(data.categories);
      searchMeal(data.categories); // Initialize search with fetched data
  });

const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

// Function to display meals
const displayMeals = (mealData) => {
    const container = document.getElementById("meal-data");
    container.innerHTML = '';

    mealData.forEach(meal => {
        const shortDescription = truncateText(meal.strCategoryDescription, 40);

        const mealDiv = document.createElement('div');
        mealDiv.className = 'mb-3 p-3 border text-center';
        mealDiv.style.width = '300px';

        mealDiv.innerHTML = `
            <img src="${meal.strCategoryThumb}" alt="${meal.strCategory}" class="img-fluid mb-2" />
            <h3>${meal.strCategory}</h3>
            <p>${shortDescription}</p>
        `;


        mealDiv.addEventListener('click', () => addToGroup(meal.strCategory));
        container.appendChild(mealDiv);
    });
};

// Search meal by category name
const searchMeal = (mealData) => {
    const searchInput = document.getElementById("search-meal");
    const searchButton = document.getElementById("get-meal");
    
    searchButton.addEventListener('click', () => {
        const searchText = searchInput.value.trim().toLowerCase();
        const filteredMeals = mealData.filter(meal =>
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

const addToGroup = (mealName) => {
    const groupContainer = document.getElementById("group-data");
    const groupItem = document.createElement('h3');
    groupItem.className = 'text-black';
    groupItem.textContent = mealName;

    groupContainer.appendChild(groupItem);
};
