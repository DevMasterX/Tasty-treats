import Notiflix from 'notiflix';
import { createGalleryMarkup } from './galleryMarkup';
import { renderGallery } from './renderGallery';
// import { recipesApiService } from '../services/recipes-api-service';
import { hideLoader, showLoader } from './loader';
import { updateFavPaginationBtns } from './pagination/favorites-pagination';
import { allFavRecipes } from './fav-categories';

import {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
} from '../utils/localStorage';

import { STORAGE_KEYS } from '../../constants/constants';
const favoritesKey = STORAGE_KEYS.FAVORITES_KEY;
let favoritesValue = loadFromStorage(favoritesKey) || [];
// let currentPage = null;
let page = null;
let totalPages = null;
// let currentPage = 1;
async function initFavoritesGallery(newPage = 1) {
  page = newPage;
  console.log('🚀 page:', page);
  const container = document.querySelector('.favorites-gallery-container');
  const loaderContainer = document.querySelector('.favorites-gallery');
  showLoader(loaderContainer, container);

  try {
    const recipesAmount = allFavRecipes.length;
    const perPage = getLimitByViewport();
    totalPages = Math.ceil(recipesAmount / perPage);
    console.log('🚀 recipesAmount:', recipesAmount);
    console.log('🚀 perPage:', perPage);
    console.log('🚀 totalPages:', totalPages);

    const start = (page - 1) * perPage;
    const end = start + perPage;
    console.log('🚀 start:', start);
    console.log('🚀 end:', end);

    const recipesToRender = allFavRecipes.splice(start, end);
    console.log('🚀 recipesToRender:', recipesToRender);

    // const totalPages = data.totalPages;
    // console.log('🚀 totalPages:', totalPages);

    // const page = recipesApiService.getQueryParams().page;
    // console.log('🚀 page:', page);

    // recipesApiService.updateParams('totalPages', totalPages);

    const markup = createGalleryMarkup(recipesToRender);

    renderGallery(container, markup);

    updateFavPaginationBtns(page, totalPages);
    // getCurrentPage(page);
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

function getCurrentPage() {
  return page;
}

function getTotalPages() {
  return totalPages;
}

export { initFavoritesGallery, getCurrentPage, getTotalPages };
