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
  initAllCategories();
});
