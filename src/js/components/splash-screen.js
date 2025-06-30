function initSplashScreen() {
  window.addEventListener('load', () => {
    const splash = document.querySelector('.splash-screen');
    setTimeout(() => {
      splash.classList.add('is-hidden');
    }, 2000);
  });
}

export { initSplashScreen };
