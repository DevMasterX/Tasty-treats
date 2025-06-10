import { STORAGE_KEYS } from '../../constants/constants';
import { loadFromStorage } from '../utils/localStorage';
import { fetchRecipeInfo } from '../services/recipe-info';

async function getFavRecipes() {
  const favCategoriesKey = STORAGE_KEYS.FAVORITES_KEY;
  const favCategoriesIdList = loadFromStorage(favCategoriesKey);

  if (!Array.isArray(favCategoriesIdList) || favCategoriesIdList.length === 0) {
    console.log('❗️ No favorites recipes');
    return;
  }

  try {
    const favRecipes = await Promise.all(
      favCategoriesIdList.map(id => fetchRecipeInfo(id))
    );

    return favRecipes;
  } catch (error) {
    console.error('Error fetching favorites recipes:', error);
    throw error;
  }
}

export { getFavRecipes };
