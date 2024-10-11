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
