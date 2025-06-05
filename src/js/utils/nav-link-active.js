function highlightActiveNavLink() {
  const homeBtn = document.querySelector('.js-home-btn');
  const mobileHomeBtn = document.querySelector('.js-mobile-home-btn');
  console.log('🚀 mobileHomeBtn:', mobileHomeBtn);

  const favoritesBtn = document.querySelector('.js-favorites-btn');
  const mobileFavoritesBtn = document.querySelector('.js-mobile-favorite-btn');

  if (!homeBtn || !favoritesBtn) return;

  const currentPath = window.location.pathname;

  homeBtn?.classList.remove('current');
  mobileHomeBtn?.classList.remove('mobile-menu-current');

  favoritesBtn?.classList.remove('current');
  mobileFavoritesBtn?.classList.remove('mobile-menu-current');

  if (currentPath.includes('favorites')) {
    favoritesBtn?.classList.add('current');
    mobileFavoritesBtn?.classList.add('mobile-menu-current');
  } else {
    homeBtn?.classList.add('current');
    mobileHomeBtn?.classList.add('mobile-menu-current');
  }
}

export { highlightActiveNavLink };
