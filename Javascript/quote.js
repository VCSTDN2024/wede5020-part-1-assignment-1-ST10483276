document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quoteForm");

  const packagePrices = {
    home_cleaning: 350,          // Basic Package
    LivingArea_cleaning: 700,    // Enterprise
    bedroom_cleaning: 1200,      // Grootman Package
    bathroom_cleaning: 500,      // Vehicle Detailing
    vehicle_cleaning: 950,       // Custom Package
    Custom: 0                     // Will ask for details
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form refresh

    const name = document.getElementById("name").ariaValueMax.trim();
    const surname = document.getElementById("Surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const service = document.getElementById("service").value;

    // Calculate price
    const price = packagePrices[service];

    // Generate message
    let message = "";
    if (price > 0) {
      message = `
        <p>Thank you, ${name} ${surname}, for requesting a quote!</p>
        <p>Service Selected: ${service.replace(/_/g, ' ')}</p>
        <p>Estimated Price: R${price.toFixed(2)}</p>
        <p>We will contact you shortly at ${email} or ${phone}.</p>
      `;
    } else {
      message = `
        Hello ${name} ${surname},\n
        You selected “Other”. Please describe your cleaning needs in our contact form,
        and we’ll send you a custom quote.
      `;
    }

        // Display quote in an alert (you can replace this with a custom modal or div)
    document.getElementById("quoteResult").textContent = message;
  });

  // Helper to get readable package name
  function getPackageName(serviceKey) {
    const names = {
      home_cleaning: "Basic Package",
      LivingArea_cleaning: "Enterprise Package",
      bedroom_cleaning: "Grootman Package",
      bathroom_cleaning: "Vehicle Detailing",
      vehicle_cleaning: "Custom Package",
      other: "Other"
    };
    return names[serviceKey] || "Unknown Package";
  }
});

