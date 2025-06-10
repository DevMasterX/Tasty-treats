import Notiflix from 'notiflix';
import { createGalleryMarkup } from './galleryMarkup';
import { renderGallery } from './renderGallery';
import { hideLoader, showLoader } from './loader';
import { updateFavPaginationBtns } from './pagination/favorites-pagination';
import { getFavRecipes } from '../services/fav-recipes';
import {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
} from '../utils/localStorage';
import { STORAGE_KEYS } from '../../constants/constants';

const favoritesKey = STORAGE_KEYS.FAVORITES_KEY;
// let favoritesValue = loadFromStorage(favoritesKey) || [];
console.log('🚀 favoritesValue:', favoritesValue);

// let currentPage = null;
let page = null;
let totalPages = null;
// let currentPage = 1;
async function initFavoritesGallery(newPage = 1) {
  page = newPage;
  // console.log('🚀 page:', page);
  const container = document.querySelector('.favorites-gallery-container');
  const loaderContainer = document.querySelector('.favorites-gallery');
  showLoader(loaderContainer, container);

  try {
    const favRecipes = await getFavRecipes();
    const recipesAmount = favRecipes.length;
    const perPage = getLimitByViewport();
    totalPages = Math.ceil(recipesAmount / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const recipesToRender = favRecipes.slice(start, end);
    const markup = createGalleryMarkup(recipesToRender);

    renderGallery(container, markup);
    updateFavPaginationBtns(page, totalPages);

    initFavoriteButtons();
  } catch (error) {
    console.error('Error loading favorite recipes on the client:', error);
    throw error;
  } finally {
    hideLoader(loaderContainer, container);
  }
}

function initFavoriteButtons() {
  const favoritesValue = loadFromStorage(favoritesKey) || [];
  const favoriteBtns = document.querySelectorAll('.gallery-item__favorite-btn');
  if (!favoriteBtns) return;
  favoriteBtns.forEach(btn => {
    const icon = btn.querySelector('.favorite-btn__icon');
    const id = btn.dataset.id;
    if (!icon || !id) return;

    checkFavoriteBtnSavedClass(icon, id);

    btn.addEventListener('click', () => {
      // if (!favoritesValue.includes(id)) {
      //   icon.classList.add('saved');
      //   favoritesValue.push(id);
      //   Notiflix.Notify.success('Added to favorite', {
      //     clickToClose: true,
      //   });
      // } else {
      icon.classList.remove('saved');
      const index = favoritesValue.indexOf(id);
      favoritesValue.splice(index, 1);
      Notiflix.Notify.warning('Removed from favorite', {
        clickToClose: true,
      });
      // }

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
