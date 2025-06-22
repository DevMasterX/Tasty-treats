import Notiflix from 'notiflix';
import { createGalleryMarkup } from './galleryMarkup';
import { renderGallery } from './renderGallery';
import { recipesApiService } from '../services/recipes-api-service';
import { hideLoader, showLoader } from './loader';
import { updatePaginationBtns } from './pagination/homePagination';
// import { renderPaginationButtons } from './pagination/render-pagination-buttons';
// import { setupOpenButtons } from './modal';

import {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
} from '../utils/localStorage';

import { STORAGE_KEYS } from '../../constants/constants';
const favoritesKey = STORAGE_KEYS.FAVORITES_KEY;
let favoritesValue = loadFromStorage(favoritesKey) || [];
const pagination = document.querySelector('.pagination');
pagination.classList.add('visually-hidden');
async function initMainGallery() {
  const container = document.querySelector('.main-gallery-container');
  const loaderContainer = document.querySelector('.main-gallery');
  showLoader(loaderContainer, container);

  try {
    const data = await recipesApiService.fetchRecipes();
    console.log('Init main gallery');

    const totalPages = data.totalPages;
    console.log('🚀 totalPages:', totalPages);

    const page = recipesApiService.getQueryParams().page;
    console.log('🚀 page:', page);

    recipesApiService.updateParams('totalPages', totalPages);

    const markup = createGalleryMarkup(data.results);
    pagination.classList.toggle('visually-hidden', totalPages <= 1);
    renderGallery(container, markup);

    updatePaginationBtns(page, totalPages);

    initFavoriteButtons();
  } catch (error) {
    console.error('Error loading recipes on the client:', error);
    throw error;
  } finally {
    hideLoader(loaderContainer, container);
  }
}

function initFavoriteButtons() {
  favoritesValue = loadFromStorage(favoritesKey) || [];
  const favoriteBtns = document.querySelectorAll('.gallery-item__favorite-btn');
  if (!favoriteBtns) return;
  favoriteBtns.forEach(btn => {
    const icon = btn.querySelector('.favorite-btn__icon');
    const id = btn.dataset.id;
    if (!icon || !id) return;

    checkFavoriteBtnSavedClass(icon, id);

    btn.addEventListener('click', () => {
      if (!favoritesValue.includes(id)) {
        icon.classList.add('saved');
        favoritesValue.push(id);
        Notiflix.Notify.success('Added to favorites', {
          clickToClose: true,
        });
      } else {
        icon.classList.remove('saved');
        const index = favoritesValue.indexOf(id);
        favoritesValue.splice(index, 1);
        Notiflix.Notify.warning('Removed from favorites', {
          clickToClose: true,
        });
      }

      if (favoritesValue.length === 0) {
        removeFromStorage(favoritesKey);
        return;
      }

      saveToStorage(favoritesKey, favoritesValue);
    });
  });
}

function checkFavoriteBtnSavedClass(icon, id) {
  if (!icon || !id) return;

  if (favoritesValue.includes(id)) {
    icon.classList.add('saved');
  }
}

export { initMainGallery };
