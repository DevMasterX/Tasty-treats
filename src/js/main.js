// import ResizeObserver from 'resize-observer-polyfill';
// window.ResizeObserver = ResizeObserver;

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
import { setHeroMarginTop } from './utils/hero-margin-top.js';
import { initHomePagination } from './components/pagination/homePagination';
import { renderPaginationButtons } from './components/pagination/render-pagination-buttons';
import { initBackToTop } from './components/back-to-top';
import { highlightActiveNavLink } from './utils/nav-link-active';
// import { initBackToTop } from './components/back-to-top.js';

document.addEventListener('DOMContentLoaded', async () => {
  highlightActiveNavLink();
  setHeroMarginTop();
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
  // console.log('🚀 totalPages:', totalPages);
  // const totalPages = recipesApiService.getTotalPages();
  // console.log(getTotalPages());
  // renderPaginationButtons();
  // initSwiper();
  // initAllCategories();
  // initPopularRecipes();
  // initFilters();
});
