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
  // .catch((error) => console.error("Error fetching liked pet:", error));
}
