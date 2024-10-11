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
        <p>${pet.description}</p>
        <p class="mt-2"><strong>Vaccination History:</strong> ${
          pet.vaccinated_status || "N/A"
        }</p>
      `;
      document.getElementById("pet-modal").classList.remove("hidden");
    });
  // .catch((error) => console.error("Error fetching pet details:", error));
}

// Function to close the modal
function closeModal() {
  document.getElementById("pet-modal").classList.add("hidden");
}
