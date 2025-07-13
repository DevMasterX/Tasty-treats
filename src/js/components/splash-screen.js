function initSplashScreen() {
  const splash = document.querySelector('.splash-screen');
  const isFirstVisit = !sessionStorage.getItem('visited');
  splash.style.display = 'none';

  if (isFirstVisit) {
    splash.style.display = 'flex';
    setTimeout(() => {
      splash.classList.add('is-hidden');
      splash.setAttribute('aria-hidden', 'true');

      splash.addEventListener('transitionend', e => {
        if (e.propertyName === 'opacity') {
          splash.style.display = 'none';
        }
      });
    }, 700);
    sessionStorage.setItem('visited', 'true');
  }
}

export { initSplashScreen };
