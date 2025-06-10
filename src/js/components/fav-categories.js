import { getFavRecipes } from '../services/fav-recipes';

async function initFavCategories() {
  const favCategoriesContainer = document.querySelector(
    '.fav-categories-btn-wrapper'
  );
  if (!favCategoriesContainer) return;
  try {
    const favRecipes = await getFavRecipes();
    const favCategoriesList = [
      ...new Set(favRecipes.map(category => category.category)),
    ];

    favCategoriesContainer.innerHTML =
      createFavCategoriesMarkup(favCategoriesList);
  } catch (error) {
    console.error('Error fetching favorites recipes:', error);
    throw error;
  }
}

function createFavCategoriesMarkup(categoriesList) {
  return categoriesList
    .map(
      category => `
        <button class="fav-btn" type="button" aria-label="${category} category button">${category}</button>
        `
    )
    .join('');
}

export { initFavCategories };
