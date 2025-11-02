document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");
  const resultDiv = document.getElementById("quoteResult");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("Surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const service = document.getElementById("service").value;

    // Basic validation
    if (!name || !surname || !email || !phone || !address || !service) {
      resultDiv.textContent = "Please fill in all required fields.";
      resultDiv.style.color = "red";
      return;
    }

    // Format phone number (optional: enforce +27 format)
    const formattedPhone = phone.startsWith("+27") ? phone : "+27 " + phone;

    // Create a mock quote message
    const serviceNames = {
      home_cleaning: "Basic Package",
      LivingArea_cleaning: "Enterprise",
      bedroom_cleaning: "Grootman Package",
      bathroom_cleaning: "Vehicle Detailing",
      vehicle_cleaning: "Custom Package",
      other: "Other"
    };

    const selectedService = serviceNames[service] || "Unknown Package";

    resultDiv.style.color = "green";
    resultDiv.innerHTML = `
      Thank you, <strong>${name} ${surname}</strong>!<br>
      We've received your request for the <strong>${selectedService}</strong>.<br>
      A quote will be sent to <strong>${email}</strong> and we'll follow up at <strong>${formattedPhone}</strong>.<br>
      Our team will reach out to <strong>${address}</strong> soon!
    `;

    // Optionally reset the form
    form.reset();
  });
});