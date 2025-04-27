import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;
// import 'choices.js/public/assets/styles/choices.css';
// import SimpleBar from 'simplebar';
// import 'simplebar';
// import 'simplebar/dist/simplebar.css';

import { initTheme } from './components/themeSwitcher';
import { initMobileMenu } from './components/mobileMenu';
import { initModal } from './components/modal.js';
import { initSwiper } from './components/swiper';
import { initAllCategories } from './components/init-all-categories.js';
import { initPopularRecipes } from './components/init-popular-recipes';
import { initFilters } from './components/filters';
import { initMainGallery } from './components/mainGallery.js';

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initMobileMenu();
  initModal();

  await Promise.all([
    initSwiper(),
    initAllCategories(),
    initPopularRecipes(),
    initFilters(),
    initMainGallery(),
  ]);
  // initSwiper();
  // initAllCategories();
  // initPopularRecipes();
  // initFilters();
});
