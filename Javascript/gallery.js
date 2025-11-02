 document.querySelector('.next-button').addEventListener('click', function (e) {
    e.preventDefault();

    // Apply fade-out to body
    document.body.classList.add('fade-out');

    // Smooth scroll to top using requestAnimationFrame
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
    }, 850); // match fade duration
  });
