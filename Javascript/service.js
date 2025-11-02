  document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll(".service-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.9 // Trigger when the card is visible
    });

    serviceCards.forEach(card => {
      observer.observe(card);
    });
  });

    function applyFade(selector) {
    const button = document.querySelector(selector);
    if (!button) return;

    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Add fade-out class to body
      document.body.classList.add('fade-out');

      // Smooth scroll to top
      const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.scrollTo(0, c - c / 10);
          requestAnimationFrame(scrollToTop);
        }
      };
      scrollToTop();

      // Navigate after fade completes
      setTimeout(() => {
        window.location.href = this.href;
      }, 850);
    });
  }

