// Hover effect for profile cards
document.querySelectorAll('.profile-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.02)';
    card.style.transition = 'transform 0.3s ease';
    card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
  });
});

// Toggle message on <p> click
const paragraph = document.querySelector('main > p');
let toggled = false;

paragraph.style.cursor = 'pointer'; // Make it look clickable

paragraph.addEventListener('click', () => {
  if (!toggled) {
    paragraph.textContent = "✨ Clean space, clear mind. Every detail matters!";
  } else {
    paragraph.textContent = "At Clean Touch, we believe that a true clean space is a healthy and renewing one.  While standard cleaning keeps the space tidy, we go beyond that to ensure a deep clean that promotes well-being. Our approach involves using eco-friendly products and advanced techniques to eliminate harmful bacteria, allergens, and pollutants. This not only enhances the appearance of your space but also creates an environment that supports physical health and mental clarity, making it a true sanctuary for relaxation and productivity. Our advanced techniques include steam cleaning, which uses high-temperature vapor to eliminate germs without harsh chemicals, and filtration, which captures up to 99.97% of particles. We also employ UV light sanitization to target and destroy bacteria and viruses on surfaces, ensuring a thorough and safe clean.";
  }
  toggled = !toggled;
});