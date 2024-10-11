function fetchPets(category = "") {
  let url = category
    ? `https://openapi.programming-hero.com/api/peddy/category/${category}`
    : "https://openapi.programming-hero.com/api/peddy/pets";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pets = data.pets;
      document.getElementById("pets-grid").innerHTML = "";
      pets.forEach((pet) => {
        document.getElementById("pets-grid").innerHTML += `
          <div class="bg-white shadow-md rounded-lg p-4">
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
    });
}

fetchPets();
