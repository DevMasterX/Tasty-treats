import { apiClient } from '../api/axios';

async function fetchPopularRecipes() {
  try {
    const res = await apiClient.get('/recipes/popular');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch popular recipes:', error);
    throw error;
  }
}

export { fetchPopularRecipes };
