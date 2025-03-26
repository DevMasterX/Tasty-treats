import { initTheme } from './components/themeSwitcher';
import { initMobileMenu } from './components/mobileMenu';
import { initModal } from './components/modal.js';

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initMobileMenu();
  initModal();
});
