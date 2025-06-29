import { recipesApiService } from '../services/recipes-api-service';
import { deleteSavedCategory } from './current-category';

const homeBtn = document.querySelector('.js-home-btn');
const logoBtn = document.querySelector('.js-header-logo');

function initHeaderEventListeners() {
  initHomeBtnClickHandler();
  initLogoClickHandler();
}

function initHomeBtnClickHandler() {
  if (!homeBtn) return;

  homeBtn.addEventListener('click', e => {
    recipesApiService.resetFilterQueryParams();
    deleteSavedCategory();
  });
}

function initLogoClickHandler() {
  if (!logoBtn) return;

  logoBtn.addEventListener('click', e => {
    recipesApiService.resetFilterQueryParams();
    deleteSavedCategory();
  });
}

export { initHeaderEventListeners };
