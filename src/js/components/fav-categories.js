import { STORAGE_KEYS } from '../../constants/constants';
import { loadFromStorage } from '../utils/localStorage';
import { fetchRecipeInfo } from '../services/recipe-info';
// console.log('🚀 favCategoriesKey:', favCategoriesKey);

// console.log('🚀 favCategories:', favCategories);
let allFavRecipes = null;
async function initFavCategories() {
  const favCategoriesContainer = document.querySelector(
    '.fav-categories-btn-wrapper'
  );
  const favCategoriesKey = STORAGE_KEYS.FAVORITES_KEY;
  const favCategoriesIdList = loadFromStorage(favCategoriesKey);
  console.log('🚀 favCategoriesId:', favCategoriesIdList);

  if (!Array.isArray(favCategoriesIdList) || favCategoriesIdList.length === 0) {
    console.log('❗️ No favorites recipes');
    return;
  }

  try {
    allFavRecipes = await Promise.all(
      favCategoriesIdList.map(id => fetchRecipeInfo(id))
    );
    console.log('🚀 allFavRecipes:', allFavRecipes);
    const favCategories = [
      ...new Set(allFavRecipes.map(category => category.category)),
    ];
    console.log('🚀 favCategories:', favCategories);

    favCategoriesContainer.innerHTML = createFavCategoriesMarkup(favCategories);
  } catch (error) {
    console.error('Error fetching favorites recipes:', error);
    throw error;
  }
}

function createFavCategoriesMarkup(favCategories) {
  return favCategories
    .map(
      category => `
        <button class="fav-btn" type="button" aria-label="${category} category button">${category}</button>
        `
    )
    .join('');
}

export { initFavCategories, allFavRecipes };
