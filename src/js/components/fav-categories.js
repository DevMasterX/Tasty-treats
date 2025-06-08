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
  console.log('🚀 favCategoriesContainer:', favCategoriesContainer);
  const favCategoriesKey = STORAGE_KEYS.FAVORITES_KEY;
  const favCategoriesId = loadFromStorage(favCategoriesKey);
  console.log('🚀 favCategoriesId:', favCategoriesId);

  if (!Array.isArray(favCategoriesId) || favCategoriesId.length === 0) {
    console.log('❗️ No favorites recipes');
    return;
  }

  try {
    allFavRecipes = await Promise.all(
      favCategoriesId.map(id => fetchRecipeInfo(id))
    );
    console.log('🚀 allFavRecipes:', allFavRecipes);
    const favCategories = allFavRecipes.map(category => category.category);
    console.log('🚀 favCategories:', favCategories);
    favCategoriesContainer.innerHTML = createFavCategoriesMarkup(favCategories);
  } catch (error) {
    console.error('Error fetching favorites recipes:', error);
    throw error;
  }

  //   const allCategories = await fetchAllCategoriesList();
  //   console.log('🚀 allCategories:', allCategories);

  //   const favCategories = allCategories.filter(category =>
  //     favCategoriesId.includes(category._id)
  //   );
  //   console.log('🚀 favCategories:', favCategories);
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
