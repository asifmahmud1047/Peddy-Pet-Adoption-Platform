fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then((response) => response.json())
  .then((data) => {
    const categories = data.categories;
    const categoriesContainer = document.getElementById("categories");

    categories.forEach((category) => {
      const categoryButton = document.createElement("button");
      categoryButton.className =
        "category-button rounded-3xl flex items-center justify-center";
      categoryButton.innerHTML = `<img src="${category.category_icon}" alt="${category.category} icon" class="category-icon mr-2">${category.category}`;
      categoryButton.onclick = () => fetchPets(category.category); // Fetch pets by category on click
      categoriesContainer.appendChild(categoryButton);
    });
  });
