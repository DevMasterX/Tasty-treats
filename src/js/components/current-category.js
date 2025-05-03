import { recipesApiService } from '../services/recipes-api-service';
import { loadFromStorage } from '../utils/localStorage';
import { STORAGE_KEYS } from '../../constants/constants';

function checkSavedCategory() {
  const currentCategory = loadFromStorage(STORAGE_KEYS.CURRENT_CATEGORY);
  if (currentCategory) {
    recipesApiService.updateParams('category', currentCategory);
  }
}

export { checkSavedCategory };
