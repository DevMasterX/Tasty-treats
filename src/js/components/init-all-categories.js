import { initSimpleBar } from '../utils/simplebar';
import { fetchAllCategoriesList } from '../services/all-categories';
import { recipesApiService } from '../services/recipes-api-service';
import { initMainGallery } from './main-gallery';
import { STORAGE_KEYS } from '../../constants/constants';
import {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
} from '../utils/localStorage';

const CURRENT_CATEGORY = STORAGE_KEYS.CURRENT_CATEGORY;
const allCategoriesSection = document.querySelector('.all-categories');
// const allCategoriesBtn = document.querySelector('.all-categories__button');
const allCategoriesList = document.querySelector('.all-categories__list');
const allCategoriesListWrapper = document.querySelector(
  '.all-categories__list-wrapper'
);
if (!allCategoriesList || !allCategoriesListWrapper) return;

async function initAllCategories() {
  try {
    const categories = await fetchAllCategoriesList();
    renderCategories(allCategoriesList, categories);

    initSimpleBar(allCategoriesListWrapper);
    initCurrentItem(allCategoriesList);
    initEventListeners(allCategoriesSection);
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}
function renderCategories(element, list) {
  element.innerHTML = list
    .map(
      ({ name }) => `
    <li class="all-categories__item">${name}</li>
        `
    )
    .join('');
}

function initCurrentItem(list) {
  const category = loadFromStorage(CURRENT_CATEGORY);
  const currentElement = findCurrentElement(list, category);
  if (!category || !currentElement) return;

  addCurrentClass(currentElement);
}

function findCurrentElement(list, value = null) {
  return [...list.children].find(
    element =>
      element.classList.contains('current') ||
      (value && element.textContent.trim() === value)
  );
}

function addCurrentClass(item) {
  item.classList.add('current');
}
function removeCurrentClass(current) {
  if (current) {
    current.classList.remove('current');
  }
}

function initEventListeners(section) {
  section.addEventListener('click', e => {
    const isReset = e.target.closest('.all-categories__button');
    const item = e.target.closest('.all-categories__item');

    if (isReset) {
      const current = findCurrentElement(allCategoriesList);
      removeCurrentClass(current);
      removeFromStorage(CURRENT_CATEGORY);
      recipesApiService.updateParams('category', '');
      initMainGallery();
      return;
    }
    if (item && !item.classList.contains('current')) {
      const current = findCurrentElement(allCategoriesList);
      removeCurrentClass(current);
      addCurrentClass(item);
      const category = item.textContent.trim();
      saveToStorage(CURRENT_CATEGORY, category);

      recipesApiService.updateParams('category', category);
      initMainGallery();
    }
  });
}

export { initAllCategories, removeCurrentClass };
