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
import { renderPaginationButtons } from './js/components/pagination/render-pagination-buttons';
// import { initHomePagination } from './js/components/pagination/homePagination';
// import { initBackToTop } from './js/components/back-to-top';
import { initFavoritesPagination } from './js/components/pagination/favorites-pagination';

document.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.add(isWebPSupported() ? 'webp' : 'no-webp');
  initTheme(); // Тема (светлая/тёмная)
  highlightActiveNavLink();
  renderPaginationButtons();
  //   setHeroMarginTop(); // Учитываем высоту хедера
  initHeaderEventListeners(); // Бургер, логотип и т.д.
  initMobileMenu(); // Открытие/закрытие меню
  initFavoritesPagination();
  initModal(); // Общая логика модалки
  // initHomePagination();

  // await Promise.all([initFavCategories(), initFavoritesGallery()]);
  await initFavoritesGallery();

  initBackToTop(); // Кнопка "вверх"

  //   await initFavoritesGallery(); // ⚡️ основная логика страницы
});
