// import ResizeObserver from 'resize-observer-polyfill';
// window.ResizeObserver = ResizeObserver;
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'spinkit/spinkit.min.css';
import { initTheme } from './components/themeSwitcher';
import { initHeaderEventListeners } from './components/header-event-listeners';
import { initMobileMenu } from './components/mobileMenu';
import { initModal } from './components/modal.js';
import { initSwiper } from './components/swiper';
import { initAllCategories } from './components/init-all-categories.js';
import { initPopularRecipes } from './components/init-popular-recipes';
import { initFilters } from './components/filters';
import { initMainGallery } from './components/main-gallery.js';
import { checkSavedCategory } from './components/current-category.js';
import { initHomePagination } from './components/pagination/homePagination';
import { renderPaginationButtons } from './components/pagination/render-pagination-buttons';
import { initBackToTop } from './components/back-to-top';
import { highlightActiveNavLink } from './utils/nav-link-active';

document.addEventListener('DOMContentLoaded', async () => {
  AOS.init({
    offset: 0,
    once: true,
    startEvent: 'load',
    debounceDelay: 50,
    throttleDelay: 99,
  });
  highlightActiveNavLink();
  initTheme();
  renderPaginationButtons();
  initHeaderEventListeners();
  initMobileMenu();
  initModal();
  checkSavedCategory();
  initBackToTop();
  initHomePagination();

  await Promise.all([
    initSwiper(),
    initAllCategories(),
    initPopularRecipes(),
    initFilters(),
    initMainGallery(),
  ]);
});
