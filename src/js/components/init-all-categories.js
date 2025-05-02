import { initSimpleBar } from '../utils/simplebar';
import { fetchAllCategoriesList } from '../services/all-categories';
import { recipesApiService } from '../services/recipes-api-service';
import { initMainGallery } from './main-gallery';
import {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
} from '../utils/localStorage';

const CURRENT = 'current';
const allCategoriesSection = document.querySelector('.all-categories');
const allCategoriesBtn = document.querySelector('.all-categories__button');
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
    initEventListeners(allCategoriesSection, allCategoriesBtn);
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
  const category = loadFromStorage(CURRENT);
  const currentElement = findCurrentElement(list, category);
  if (!category || !currentElement) return;

  addCurrentClass(currentElement);
  recipesApiService.updateParams('category', category);
  initMainGallery();
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

function initEventListeners(section, btn) {
  section.addEventListener('click', e => {
    const isReset = e.target.closest('.all-categories__button');
    const item = e.target.closest('.all-categories__item');

    if (isReset) {
      const current = findCurrentElement(allCategoriesList);
      removeCurrentClass(current);
      removeFromStorage(CURRENT);
      recipesApiService.updateParams('category', '');
      initMainGallery();
      return;
    }
    if (item && !item.classList.contains('current')) {
      const current = findCurrentElement(allCategoriesList);
      removeCurrentClass(current);
      addCurrentClass(item);
      const category = item.textContent.trim();
      saveToStorage(CURRENT, category);

      recipesApiService.updateParams('category', category);
      initMainGallery();
    }
  });
}

export { initAllCategories };
