import { recipesApiService } from '../services/recipes-api-service';
import { loadFromStorage, removeFromStorage } from '../utils/localStorage';
import { STORAGE_KEYS } from '../../constants/constants';

function checkSavedCategory() {
  const currentCategory = loadFromStorage(STORAGE_KEYS.CURRENT_CATEGORY);
  if (currentCategory) {
    recipesApiService.updateParams('category', currentCategory);
  }
}

function deleteSavedCategory() {
  const currentCategory = loadFromStorage(STORAGE_KEYS.CURRENT_CATEGORY);
  if (currentCategory) {
    recipesApiService.updateParams('category', '');
    removeFromStorage(STORAGE_KEYS.CURRENT_CATEGORY);
  }
}

export { checkSavedCategory, deleteSavedCategory };
