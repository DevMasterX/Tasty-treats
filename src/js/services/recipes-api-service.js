import { apiClient } from '../api/axios';

class RecipesApiService {
  constructor() {
    this.category = '';
    this.page = 1;
    this.limit = this.getLimitByViewport();
    this.time = null;
    this.area = '';
    this.ingredient = '';
  }

  getLimitByViewport() {
    const width = window.innerWidth;

    if (width >= 1280) {
      return 9;
    } else if (width >= 768) {
      return 8;
    } else {
      return 6;
    }
  }

  setCategory(category) {
    this.category = category;
  }

  setPage(page) {
    this.page = page;
  }

  setTime(time) {
    this.time = time;
  }

  setArea(area) {
    this.area = area;
  }

  setIngredient(ingredient) {
    this.ingredient = ingredient;
  }

  getQueryParams() {
    const params = {};
  }

  async fetchRecipes() {
    try {
      const response = await apiClient.get('/recipes', {
        params: this.getQueryParams(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }
}

export const recipesApiService = new RecipesApiService();
