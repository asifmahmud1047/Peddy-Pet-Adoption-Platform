// =============== (1) ===================
// 1. Fetching categories and displaying them as buttons
const fetchcategoriesBtn = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.classList.add(
          "flex",
          "justify-center",
          "items-center",
          "gap-2",
          "border",
          "rounded-lg",
          "px-4",
          "py-1"
        );
        button.innerHTML = `
        <img src="${category.category_icon}" alt="${category.category} icon" class="category-icon">
        <p class="text-xl font-semibold">${category.category}</p>
        `;

        // Fetch pets by category on click
        button.onclick = () => fetchPets(category.category.toLowerCase());
        document.getElementById("categories").appendChild(button);
      });
    });
};
fetchcategoriesBtn();

// =============== (2) ===================
// Single category
// Fetch pets by category on click
function fetchPets(category) {
  let url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pets = data.data;
      document.getElementById("pets-grid").innerHTML = "";
      pets.forEach((pet) => {
        document.getElementById("pets-grid").innerHTML += `
          <div class="bg-white shadow-md rounded-lg p-4 text-left">
            <img src="${pet.image || "placeholder.jpg"}" alt="${
          pet.name
        }" class="w-full h-32 object-cover">
            <h3 class="text-xl font-bold mt-4">${pet.pet_name}</h3>
            <p class="text-gray-600">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600">Born: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600">Gender: ${pet.gender || "N/A"}</p>
            <p class="text-teal-600 font-bold mt-2">$${pet.price}</p>

            <div class="flex justify-between items-center mt-4">
              <button class="bg-gray-200 px-4 py-2 rounded-lg" onclick="likedPet(${
                pet.id
              })">Like</button>
              <button class="bg-teal-600 text-white px-4 py-2 rounded-lg" onclick="adoptPet(${
                pet.id
              })">Adopt</button>
              <button class="bg-teal-600 text-white px-4 py-2 rounded-lg" onclick="viewDetails(${
                pet.id
              })">Details</button>
            </div>
          </div>
        `;
      });
    });
}
fetchPets();

// =============== (3) ===================
// All category
// Auto Fetch pets
function fetchAllPets(category) {
  let url = "https://openapi.programming-hero.com/api/peddy/pets";
  function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
  }
  setTimeout(() => {
    showSpinner();
  }, 2000);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pets = data.pets;
      document.getElementById("pets-grid").innerHTML = "";
      pets.forEach((pet) => {
        document.getElementById("pets-grid").innerHTML += `
          <div class="bg-white shadow-md rounded-lg p-4 text-left">
            <img src="${pet.image || "placeholder.jpg"}" alt="${
          pet.name
        }" class="w-full h-32 object-cover rounded-lg">
            <h3 class="text-xl font-bold mt-4">${pet.pet_name}</h3>
            <p class="text-gray-600">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600">Born: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600">Gender: ${pet.gender || "N/A"}</p>
            <p class="text-teal-600 font-bold mt-2">$${pet.price}</p>
            
            <div class="flex justify-between items-center mt-4">
              <button class="bg-gray-200 px-4 py-2 rounded-lg" onclick="likedPet(${
                pet.id
              })">Like</button>
              <button class="bg-teal-600 text-white px-4 py-2 rounded-lg" onclick="adoptPet(${
                pet.id
              })">Adopt</button>
              <button class="bg-teal-600 text-white px-4 py-2 rounded-lg" onclick="viewDetails(${
                pet.id
              })">Details</button>
            </div>
          </div>
        `;
      });
    });
}
fetchAllPets();

// Function to display pets
function displayPets(pets) {
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = ""; // Clear the container

  pets.forEach((pet) => {
    petsContainer.innerHTML += ` 
        <div class="pet-card bg-white shadow-md rounded-lg p-4 text-left">
            <img src="${pet.image || "placeholder.jpg"}" alt="${
      pet.name
    }" class="w-full h-32 object-cover">
            <h3 class="text-xl font-bold mt-4">${pet.pet_name}</h3>
            <p class="text-gray-600">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600">Born: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600">Gender: ${pet.gender || "N/A"}</p>
            <p class="text-teal-600 font-bold mt-2">$${pet.price}</p>
            
            <div class="flex justify-between items-center mt-4">
              <button class="bg-gray-200 px-4 py-2 rounded-lg" onclick="likedPet(${
                pet.id
              })">Like</button>
              <button class="bg-teal-600 text-white px-4 py-2 rounded-lg" onclick="adoptPet(${
                pet.id
              })">Adopt</button>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" onclick="viewDetails(${
                pet.id
              })">Details</button>
            </div>
          </div> 
    `;
  });
}

// =============== (4) ===================
// Fetch and Sort pets
function sortedPets() {
  let url = "https://openapi.programming-hero.com/api/peddy/pets";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pets = data.pets;
      // Sorting by price in descending order
      const sortedPets = pets.sort(
        (a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0)
      );

      document.getElementById("pets-grid").innerHTML = "";

      sortedPets.forEach((pet) => {
        document.getElementById("pets-grid").innerHTML += `
          <div class="bg-white shadow-md rounded-lg p-4 text-left">
            <img src="${pet.image || "placeholder.jpg"}" alt="${
          pet.name
        }" class="w-full h-32 object-cover rounded-lg">
            <h3 class="text-xl font-bold mt-4">${pet.pet_name}</h3>
            <p class="text-gray-600">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600">Born: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600">Gender: ${pet.gender || "N/A"}</p>
            <p class="text-teal-600 font-bold mt-2">$${pet.price}</p>
            
            <div class="flex justify-between items-center mt-4">
              <button class="bg-gray-200 px-4 py-2 rounded-lg" onclick="likedPet(${
                pet.id
              })">Like</button>
              <button class="bg-teal-600 text-white px-4 py-2 rounded-lg" onclick="adoptPet(${
                pet.id
              })">Adopt</button>
              <button class="bg-teal-600 text-white px-4 py-2 rounded-lg" onclick="viewDetails(${
                pet.id
              })">Details</button>
            </div>
          </div>
        `;
      });
    });
}

// =============== (5) ===================
// Event listener to sort by price when the button is clicked
document.getElementById("sort-price").addEventListener("click", () => {
  sortedPets();
});

// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================

function likePet(petId) {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((response) => response.json())
    .then((data) => {
      const pet = data.pet;
      const likedPetsContainer = document.getElementById("liked-pets");
      likedPetsContainer.innerHTML += `
        <div class="liked-pet">
          <img src="${
            pet.image || "images/placeholder.jpg"
          }" class="w-16 h-16 object-cover rounded-full">
        </div>`;
    });
}

// Function to view pet details by petId
function viewDetails(petId) {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((response) => response.json())
    .then((data) => {
      const pet = data.pet;
      document.getElementById("pet-details").innerHTML = `
        <img src="${
          pet.image || "placeholder.jpg"
        }" class="w-full h-48 object-cover rounded-lg">
        <h3 class="text-xl font-bold mt-4">${pet.pet_name}</h3>
        <p>${pet.pet_details}</p>
        <p class="mt-2"><strong>Vaccination History:</strong> ${
          pet.vaccinated_status || "N/A"
        }</p>
      `;
      document.getElementById("pet-modal").classList.remove("hidden");
    });
}

function scrollToAdoption() {
  document
    .getElementById("adopt-section")
    .scrollIntoView({ behavior: "smooth" });
}

function closeModal() {
  document.getElementById("pet-modal").classList.add("hidden");
}

function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}
