  window.addEventListener('DOMContentLoaded', () => {
    const elements = [
      document.querySelector('p'),
      ...document.querySelectorAll('h1'),
      ...document.querySelectorAll('.button-container')
    ];

    let delay = 0;

    elements.forEach((el, i) => {
      el.style.display = 'none'; // hide initially

      setTimeout(() => {
        el.style.display = 'block'; // show one by one
      }, delay);

      delay += 950; // adjust timing (ms) between each reveal
    });
  });
