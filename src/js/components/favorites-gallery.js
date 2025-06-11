import Notiflix from 'notiflix';
import { initFavCategories } from './fav-categories';
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
const pagination = document.querySelector('.pagination');
const categoriesContainer = document.querySelector('.favorites-container');
const favoritesKey = STORAGE_KEYS.FAVORITES_KEY;
let favoritesValue = loadFromStorage(favoritesKey) || [];
const perPage = getLimitByViewport();
const container = document.querySelector('.favorites-gallery-container');

let page = null;
let totalPages = null;
pagination.classList.add('centered');
pagination.classList.add('visually-hidden');
let filteredRecipes = null;
async function initFavoritesGallery(newPage = 1, categoryRecipes = null) {
  page = newPage;

  if (categoryRecipes) {
    filteredRecipes = categoryRecipes;
  }

  const loaderContainer = document.querySelector('.favorites-gallery');
  showLoader(loaderContainer, container);

  try {
    if (filteredRecipes) {
      console.log('🚀 filteredRecipes:', filteredRecipes);
      const favRecipes = await getFavRecipes();
      const recipesAmount = Array.isArray(filteredRecipes)
        ? filteredRecipes.length
        : 0;
      console.log('🚀 recipesAmount:', recipesAmount);
      totalPages = Math.ceil(recipesAmount / perPage);
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const recipesToRender = filteredRecipes?.slice(start, end);
      // if (favRecipes) {
      //   initFavCategories(favRecipes);
      // }
      // categoriesContainer.classList.toggle('visually-hidden', !favRecipes);
      if (recipesToRender) {
        const markup = createGalleryMarkup(recipesToRender);
        renderGallery(container, markup);
        initFavoriteButtons();
      }
      pagination.classList.toggle('visually-hidden', totalPages <= 1);
      updateFavPaginationBtns(page, totalPages);
    } else {
      const favRecipes = await getFavRecipes();
      const recipesAmount = Array.isArray(favRecipes) ? favRecipes.length : 0;
      console.log('🚀 recipesAmount:', recipesAmount);
      totalPages = Math.ceil(recipesAmount / perPage);
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const recipesToRender = favRecipes?.slice(start, end);
      if (favRecipes) {
        initFavCategories(favRecipes);
      }
      categoriesContainer.classList.toggle('visually-hidden', !favRecipes);
      if (recipesToRender) {
        const markup = createGalleryMarkup(recipesToRender);
        renderGallery(container, markup);
        initFavoriteButtons();
      }
      pagination.classList.toggle('visually-hidden', totalPages <= 1);
      updateFavPaginationBtns(page, totalPages);
    }
  } catch (error) {
    // try {
    //   const favRecipes = await getFavRecipes();
    //   const recipesAmount = Array.isArray(favRecipes) ? favRecipes.length : 0;
    //   console.log('🚀 recipesAmount:', recipesAmount);
    //   totalPages = Math.ceil(recipesAmount / perPage);
    //   const start = (page - 1) * perPage;
    //   const end = start + perPage;

    //   const recipesToRender = favRecipes?.slice(start, end);
    //   if (favRecipes) {
    //     initFavCategories(favRecipes);
    //   }

    //   categoriesContainer.classList.toggle('visually-hidden', !favRecipes);

    //   if (recipesToRender) {
    //     const markup = createGalleryMarkup(recipesToRender);
    //     renderGallery(container, markup);
    //     initFavoriteButtons();
    //   }

    //   pagination.classList.toggle('visually-hidden', totalPages <= 1);
    //   updateFavPaginationBtns(page, totalPages);
    // }

    console.error('Error loading favorite recipes on the client:', error);
    throw error;
  } finally {
    hideLoader(loaderContainer, container);
  }
}

function initFavoriteButtons() {
  //   const favoritesValue = loadFromStorage(favoritesKey) || [];
  const favoriteBtns = document.querySelectorAll('.gallery-item__favorite-btn');
  if (!favoriteBtns) return;
  favoriteBtns.forEach(btn => {
    const icon = btn.querySelector('.favorite-btn__icon');
    const id = btn.dataset.id;
    if (!icon || !id) return;

    checkFavoriteBtnSavedClass(icon, id);

    btn.addEventListener('click', async () => {
      icon.classList.remove('saved');
      const index = favoritesValue.indexOf(id);
      favoritesValue.splice(index, 1);

      btn.closest('.gallery-item').style.display = 'none';

      Notiflix.Notify.warning('Removed from favorite', {
        clickToClose: true,
      });
      // }

      if (favoritesValue.length === 0) {
        removeFromStorage(favoritesKey);
      } else {
        saveToStorage(favoritesKey, favoritesValue);
      }
      const favRecipes = await getFavRecipes();
      if (favRecipes) {
        initFavCategories(favRecipes);
      }
      categoriesContainer.classList.toggle('visually-hidden', !favRecipes);
      //   saveToStorage(favoritesKey, favoritesValue);
      const newTotalPages = Math.ceil(favoritesValue.length / perPage);
      if (page > newTotalPages) {
        page = newTotalPages;
        initFavoritesGallery(page);
      }
      //   initFavoritesGallery(page);
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

function resetFilteredRecipes() {
  filteredRecipes = null;
}

export {
  initFavoritesGallery,
  getCurrentPage,
  getTotalPages,
  resetFilteredRecipes,
};
