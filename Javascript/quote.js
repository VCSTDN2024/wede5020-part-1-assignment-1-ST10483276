// Modal functions
const modal = document.getElementById("submissionModal");
const modalMessage = document.getElementById("modalMessage");

function openModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "flex"; // Show modal
}

function closeModal() {
  modal.style.display = "none"; // Hide modal
}

const form = document.getElementById("joinForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    return;
  }

  const name = document.getElementById("name").value;

  openModal(`Hello, ${name}! Thank you for choosing The Clean Touch. We will contact you shortly with your quote.`);

  form.reset();
});
