import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

// import SimpleBar from 'simplebar';
// import 'simplebar';
// import 'simplebar/dist/simplebar.css';

import { initTheme } from './components/themeSwitcher';
import { initMobileMenu } from './components/mobileMenu';
import { initModal } from './components/modal.js';
import { initSwiper } from './components/swiper';
import { initAllCategories } from './components/init-all-categories.js';

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initMobileMenu();
  initModal();

  initSwiper();
  await initAllCategories();
  // const el = document.querySelector('.all-categories__list');
  // new SimpleBar(el);
});
