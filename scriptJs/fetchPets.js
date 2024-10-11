// Fetch all pets from the API
async function fetchPets() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await response.json();
    return data.pets; // Assuming 'pets' is the array in the response
  } catch (error) {
    console.error("Error fetching pets:", error);
    return [];
  }
}

// Function to display pets
function displayPets(pets) {
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = ""; // Clear the container

  pets.forEach((pet) => {
    petsContainer.innerHTML += ` 
        <div class="pet-card bg-white shadow-md rounded-lg p-4">
            <img src="${pet.image || "placeholder.jpg"}" alt="${
      pet.name
    }" class="w-full h-32 object-cover">
            <h3 class="text-xl font-bold mt-4">${pet.pet_name}</h3>
            <p class="text-gray-600">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600">Born: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600">Gender: ${pet.gender || "N/A"}</p>
            <p class="text-teal-600 font-bold mt-2">$${pet.price}</p>
            <div class="flex justify-between items-center mt-4">
              <button class="bg-gray-200 px-4 py-2 rounded-lg">Like</button>
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

// Event listener to sort by price when the button is clicked
document.getElementById("sort-price").addEventListener("click", () => {
  fetchPets().then((pets) => {
    // Sort pets in descending order by price
    pets.sort((a, b) => b.price - a.price);

    // Display the sorted pets
    displayPets(pets);
  });
});
