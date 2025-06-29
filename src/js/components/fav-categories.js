import {
  initFavoritesGallery,
  resetFilteredRecipes,
} from './favorites-gallery';
const categoriesContainer = document.querySelector('.favorites-container');

let isListenersAdded = false;
const favCategoriesContainer = document.querySelector(
  '.fav-categories-btn-wrapper'
);

function initFavCategories(favRecipes) {
  categoriesContainer.classList.toggle(
    'visually-hidden',
    !favRecipes || favRecipes.length === 0
  );

  if (!favRecipes || !favCategoriesContainer) return;

  try {
    const favCategoriesList = [
      ...new Set(favRecipes.map(category => category.category)),
    ];

    favCategoriesContainer.innerHTML =
      createFavCategoriesMarkup(favCategoriesList);

    scrollHint(favCategoriesContainer);
    initDragScroll(favCategoriesContainer);
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
  if (window.innerWidth >= 1024) {
    el.scrollLeft = 500;
    setTimeout(() => (el.scrollLeft = 0), 500);
  }
  el.scrollLeft = 250;
  setTimeout(() => (el.scrollLeft = 0), 500);
}

function initButtonsListeners(favRecipes) {
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

function initDragScroll(container) {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.clientX;
    e.preventDefault();
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('grabbing');
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('grabbing');
  });

  container.addEventListener('mousemove', e => {
    if (!isDown) return;
    const walk = e.clientX - startX;
    container.scrollLeft = scrollLeft - walk;
    container.classList.add('grabbing');
  });
}

export { initFavCategories };
