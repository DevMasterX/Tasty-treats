function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', toggleVisibility);
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
  function toggleVisibility(e) {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
}

export { initBackToTop };
