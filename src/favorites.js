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

// import { initBackToTop } from './js/components/back-to-top';

document.addEventListener('DOMContentLoaded', async () => {
  highlightActiveNavLink();
  //   setHeroMarginTop(); // Учитываем высоту хедера
  initTheme(); // Тема (светлая/тёмная)
  initHeaderEventListeners(); // Бургер, логотип и т.д.
  initMobileMenu(); // Открытие/закрытие меню
  initModal(); // Общая логика модалки
  initBackToTop(); // Кнопка "вверх"

  //   await initFavoritesGallery(); // ⚡️ основная логика страницы
});
