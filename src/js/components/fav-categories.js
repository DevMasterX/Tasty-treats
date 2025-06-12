// import { initFavoritesGallery } from './favorites-gallery';
// console.log('🚀 initFavoritesGallery:', initFavoritesGallery);
import {
  initFavoritesGallery,
  resetFilteredRecipes,
} from './favorites-gallery';
const categoriesContainer = document.querySelector('.favorites-container');

let isListenersAdded = false;

function initFavCategories(favRecipes) {
  categoriesContainer.classList.toggle('visually-hidden', !favRecipes);
  if (!favRecipes) return;
  // const buttons = [...categoriesContainer.querySelectorAll('.fav-btn')];

  // const favAllBtn = document.querySelector('.fav-all-btn');
  // console.log('🚀 favAllBtn:', favAllBtn);
  const favCategoriesContainer = document.querySelector(
    '.fav-categories-btn-wrapper'
  );
  if (!favCategoriesContainer) return;

  try {
    const favCategoriesList = [
      ...new Set(favRecipes.map(category => category.category)),
    ];

    favCategoriesContainer.innerHTML =
      createFavCategoriesMarkup(favCategoriesList);

    scrollHint(favCategoriesContainer);

    if (!isListenersAdded) {
      initButtonsListeners(favRecipes);
    }
  } catch (error) {
    console.error('Error fetching favorites recipes:', error);
    throw error;
  }
}

function createFavCategoriesMarkup(categoriesList) {
  return categoriesList
    .map(
      category => `
        <button class="fav-btn" type="button" aria-label="${category} category button" data-category="${category}">${category}</button>
        `
    )
    .join('');
}

function scrollHint(el) {
  //   const el = document.querySelector('.fav-categories-btn-wrapper');
  if (window.innerWidth >= 1024) {
    el.scrollLeft = 500;
    setTimeout(() => (el.scrollLeft = 0), 500);
  }
  el.scrollLeft = 250;
  setTimeout(() => (el.scrollLeft = 0), 500);
}

function initButtonsListeners(favRecipes) {
  console.log('🚀 favRecipes:', favRecipes);

  if (!favRecipes) return;

  const btnContainer = document.querySelector('.js-categories-btn-container');

  btnContainer.addEventListener('click', e => onBtnClick(e, favRecipes));
  isListenersAdded = true;
}

function onBtnClick(e, favRecipes) {
  const button = e.target.closest('button');
  if (!button) return;
  const category = button.dataset.category;

  if (!category) return;
  console.log('🚀 category:', category);
  console.log('🚀 button:', button);

  resetCheckedClass();
  addCheckedClass(button);

  if (category === 'All') {
    resetFilteredRecipes();
    initFavoritesGallery();
    return;
  }

  const filteredRecipes = favRecipes.filter(
    recipe => recipe.category === category
  );
  // console.log('🚀 filteredRecipes:', filteredRecipes);

  initFavoritesGallery(1, filteredRecipes);
}

function resetCheckedClass() {
  const favAllBtn = document.querySelector('.fav-all-btn');
  const categoryButtons = [
    ...document.querySelector('.fav-categories-btn-wrapper').children,
  ];

  categoryButtons.forEach(btn => {
    if (btn.classList.contains('checked')) {
      btn.classList.remove('checked');
    }
  });

  if (favAllBtn.classList.contains('checked')) {
    favAllBtn.classList.remove('checked');
  }
}

function addCheckedClass(button) {
  if (!button.classList.contains('checked')) {
    button.classList.add('checked');
  }
}

function resetCheckedCategory() {
  checkedCategory = null;
}

export { initFavCategories, resetCheckedCategory };
