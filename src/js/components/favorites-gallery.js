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
const allCategoriesBtn = document.querySelector('.fav-all-btn');
let page = null;
let totalPages = null;
let favRecipes = null;
let filteredRecipes = null;

if (document.body.dataset.currentPage === 'favorites') {
  pagination.classList.add('centered');
  pagination.classList.add('visually-hidden');
}

async function initFavoritesGallery(newPage = 1, categoryRecipes = null) {
  page = newPage;

  if (categoryRecipes) {
    filteredRecipes = categoryRecipes;
  }

  const loaderContainer = document.querySelector('.favorites-gallery');
  showLoader(loaderContainer, container);

  try {
    if (filteredRecipes) {
      const recipesAmount = Array.isArray(filteredRecipes)
        ? filteredRecipes.length
        : 0;

      totalPages = Math.ceil(recipesAmount / perPage);
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const recipesToRender = filteredRecipes?.slice(start, end);
      pagination.classList.toggle('visually-hidden', totalPages <= 1);
      if (recipesToRender) {
        const markup = createGalleryMarkup(recipesToRender);
        renderGallery(container, markup);
        initFavoriteButtons();
      }
      updateFavPaginationBtns(page, totalPages);
    } else {
      if (!favRecipes) {
        favRecipes = await getFavRecipes();
      }
      const recipesAmount = Array.isArray(favRecipes) ? favRecipes.length : 0;

      totalPages = Math.ceil(recipesAmount / perPage);
      pagination.classList.toggle('visually-hidden', totalPages <= 1);
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const recipesToRender = favRecipes?.slice(start, end) || [];
      if (favRecipes) {
        initFavCategories(favRecipes);
      }
      categoriesContainer.classList.toggle(
        'visually-hidden',
        !favRecipes || favRecipes.length === 0
      );
      if (recipesToRender.length) {
        const markup = createGalleryMarkup(recipesToRender);
        renderGallery(container, markup);
        initFavoriteButtons();
      } else {
        const main = document.querySelector('.main');
        const markup = createGalleryEmptyMarkup();
        const hero = document.querySelector('.favorites-hero');

        hero.classList.add('empty-page');
        main.innerHTML = markup;

        return;
      }
      updateFavPaginationBtns(page, totalPages);
    }
  } catch (error) {
    console.error('Error loading favorite recipes on the client:', error);
    throw error;
  } finally {
    hideLoader(loaderContainer, container);
  }
}

function initFavoriteButtons() {
  const favoriteBtns = document.querySelectorAll('.gallery-item__favorite-btn');
  if (!favoriteBtns) return;
  favoriteBtns.forEach(btn => {
    const icon = btn.querySelector('.favorite-btn__icon');
    const id = btn.dataset.id;
    if (!icon || !id) return;

    checkFavoriteBtnSavedClass(icon, id);

    btn.addEventListener('click', async () => {
      icon.classList.remove('saved');

      Notiflix.Notify.warning('Removed from favorites', {
        clickToClose: true,
      });
      removeItemAndUpdateFavGallery(id);
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

function removeRecipeFromStorage(id) {
  const index = favoritesValue.indexOf(id);
  favoritesValue.splice(index, 1);
  if (favoritesValue.length === 0) {
    removeFromStorage(favoritesKey);
  } else {
    saveToStorage(favoritesKey, favoritesValue);
  }
}
function removeRecipeFromFavList(id) {
  const indexToRemove = favRecipes.findIndex(recipe => recipe._id === id);
  if (indexToRemove !== -1) {
    favRecipes.splice(indexToRemove, 1);
  }
}

function removeRecipeFromFilteredRecipes(id) {
  const indexToRemove = filteredRecipes.findIndex(recipe => recipe._id === id);

  if (indexToRemove !== -1) {
    filteredRecipes.splice(indexToRemove, 1);
  }
}

function removeItemAndUpdateFavGallery(id) {
  removeRecipeFromStorage(id);
  removeRecipeFromFavList(id);

  if (filteredRecipes) {
    removeRecipeFromFilteredRecipes(id);
    if (!filteredRecipes.length) {
      initFavCategories(favRecipes);
      resetFilteredRecipes();
      initFavoritesGallery();
      allCategoriesBtn.classList.add('checked');
      return;
    }
  }

  let newTotalPages;
  if (filteredRecipes) {
    newTotalPages = Math.ceil(filteredRecipes.length / perPage);
  } else {
    newTotalPages = Math.ceil(favoritesValue.length / perPage);
  }

  if (page > newTotalPages) {
    page = newTotalPages;
    // initFavoritesGallery(page);
  }
  initFavoritesGallery(page);
}

function createGalleryEmptyMarkup() {
  return `
  <div class="container fav-empty">
    <div class="fav-empty__img-wrapper" data-aos="fade-down"  data-aos-delay="200"
    data-aos-duration="1000">
      <svg class="pagination__btn-icon">
          <use href="#icon-fav-empty"></use>
        </svg>
    </div>
    <p class="fav-empty__img-text" data-aos="fade-up" data-aos-delay="350"
    data-aos-duration="1100">
    It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
    </p>
  </div>
  
  `;
}

export {
  initFavoritesGallery,
  getCurrentPage,
  getTotalPages,
  resetFilteredRecipes,
  removeItemAndUpdateFavGallery,
};
