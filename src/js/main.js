// import './components/themeSwitcher';
// import './components/mobileMenu';
// import './components/swiper';

import { initTheme } from './components/themeSwitcher';
import { initMobileMenu } from './components/mobileMenu';

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initMobileMenu();
});
