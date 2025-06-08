import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

import 'spinkit/spinkit.min.css';
// import 'animate.css';
import './scss/index.scss';
import { initTheme } from './js/components/themeSwitcher';
import { initHeaderEventListeners } from './js/components/header-event-listeners';
import { initMobileMenu } from './js/components/mobileMenu';
import { initModal } from './js/components/modal';
import { setHeroMarginTop } from './js/utils/hero-margin-top';
import { initBackToTop } from './js/components/back-to-top';
import { highlightActiveNavLink } from './js/utils/nav-link-active';
import { isWebPSupported } from './js/utils/support-webp';
import { initFavCategories } from './js/components/fav-categories';
import { initFavoritesGallery } from './js/components/favorites-gallery';
// import { initBackToTop } from './js/components/back-to-top';

document.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.add(isWebPSupported() ? 'webp' : 'no-webp');
  initTheme(); // Тема (светлая/тёмная)
  highlightActiveNavLink();
  //   setHeroMarginTop(); // Учитываем высоту хедера
  initHeaderEventListeners(); // Бургер, логотип и т.д.
  initMobileMenu(); // Открытие/закрытие меню
  initModal(); // Общая логика модалки
  await initFavCategories();
  initFavoritesGallery();
  initBackToTop(); // Кнопка "вверх"

  //   await initFavoritesGallery(); // ⚡️ основная логика страницы
});
