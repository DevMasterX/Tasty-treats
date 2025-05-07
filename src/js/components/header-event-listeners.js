import { recipesApiService } from '../services/recipes-api-service';
import { deleteSavedCategory } from './current-category';

const homeBtn = document.querySelector('.js-home-btn');
const favoritesBtn = document.querySelector('.js-favorites-btn');
const logoBtn = document.querySelector('.js-header-logo');

function initHeaderEventListeners() {
  initHomeBtnClickHandler();
  initFavoritesBtnClickHandler();
  initLogoClickHandler();
}

function initHomeBtnClickHandler() {
  if (!homeBtn) return;

  homeBtn.addEventListener('click', e => {
    recipesApiService.resetFilterQueryParams();
    deleteSavedCategory();
    toggleCurrentClass(e.currentTarget);
  });
}

function initFavoritesBtnClickHandler() {
  if (!favoritesBtn) return;

  favoritesBtn.addEventListener('click', e => {
    toggleCurrentClass(e.currentTarget);
  });
}

function initLogoClickHandler() {
  if (!logoBtn) return;
  logoBtn.addEventListener('click', e => {
    recipesApiService.resetFilterQueryParams();
    deleteSavedCategory();
    toggleCurrentClass(e.currentTarget);
  });
}

function toggleCurrentClass(target) {
  homeBtn.classList.remove('current');
  favoritesBtn.classList.remove('current');

  if (target === homeBtn || target === logoBtn) {
    homeBtn.classList.add('current');
  } else if (target === favoritesBtn) {
    favoritesBtn.classList.add('current');
  }
}

export { initHeaderEventListeners };
