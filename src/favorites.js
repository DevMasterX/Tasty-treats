// import ResizeObserver from 'resize-observer-polyfill';
// window.ResizeObserver = ResizeObserver;
import './scss/index.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import 'animate.css';
import 'spinkit/spinkit.min.css';
import { initTheme } from './js/components/themeSwitcher';
import { initHeaderEventListeners } from './js/components/header-event-listeners';
import { initMobileMenu } from './js/components/mobileMenu';
import { initModal } from './js/components/modal';
import { initBackToTop } from './js/components/back-to-top';
import { highlightActiveNavLink } from './js/utils/nav-link-active';
import { isWebPSupported } from './js/utils/support-webp';
import { initFavoritesGallery } from './js/components/favorites-gallery';
import { renderPaginationButtons } from './js/components/pagination/render-pagination-buttons';
import { initFavoritesPagination } from './js/components/pagination/favorites-pagination';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
document.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.add(isWebPSupported() ? 'webp' : 'no-webp');
  AOS.init({
    // disable: window.innerWidth < 768,
    startEvent: 'load',
    debounceDelay: 50,
    throttleDelay: 99,
  });
  initTheme(); // Тема (светлая/тёмная)
  highlightActiveNavLink();
  // AOS.init();
  // AOS.refresh();
  renderPaginationButtons();

  initHeaderEventListeners();
  initMobileMenu();
  initFavoritesPagination();
  initModal();
  await initFavoritesGallery();

  initBackToTop();
});
