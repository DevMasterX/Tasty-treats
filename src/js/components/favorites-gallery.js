import Notiflix from 'notiflix';
import { createGalleryMarkup } from './galleryMarkup';
import { renderGallery } from './renderGallery';
// import { recipesApiService } from '../services/recipes-api-service';
import { hideLoader, showLoader } from './loader';
import { updatePaginationBtns } from './pagination/homePagination';
import { allFavRecipes } from './fav-categories';

import {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
} from '../utils/localStorage';

import { STORAGE_KEYS } from '../../constants/constants';
const favoritesKey = STORAGE_KEYS.FAVORITES_KEY;
let favoritesValue = loadFromStorage(favoritesKey) || [];

async function initFavoritesGallery() {
  const container = document.querySelector('.favorites-gallery-container');
  const loaderContainer = document.querySelector('.favorites-gallery');
  showLoader(loaderContainer, container);

  try {
    console.log(allFavRecipes.length);
    const recipesAmount = allFavRecipes.length;
    const perPage = getLimitByViewport();
    const totalPages = Math.ceil(recipesAmount / perPage);
    let recipesToRender = [];
    for (const i = 1; i <= totalPages; i++) {
      for (const i = 0; i < perPage; i++) {}
    }

    // const totalPages = data.totalPages;
    // console.log('🚀 totalPages:', totalPages);

    // const page = recipesApiService.getQueryParams().page;
    // console.log('🚀 page:', page);

    // recipesApiService.updateParams('totalPages', totalPages);

    const markup = createGalleryMarkup(allFavRecipes);

    renderGallery(container, markup);

    // updatePaginationBtns(page, totalPages);

    initFavoriteButtons();
  } catch (error) {
    console.error('Error loading favorite recipes on the client:', error);
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
        Notiflix.Notify.success('Added to favorite', {
          clickToClose: true,
        });
      } else {
        icon.classList.remove('saved');
        const index = favoritesValue.indexOf(id);
        favoritesValue.splice(index, 1);
        Notiflix.Notify.warning('Removed from favorite', {
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

function getLimitByViewport() {
  const width = window.innerWidth;

  if (width >= 768) {
    return 12;
  } else {
    return 9;
  }
}

export { initFavoritesGallery };
