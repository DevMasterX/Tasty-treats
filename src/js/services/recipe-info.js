import { apiClient } from '../api/axios';

async function fetchRecipeInfo(id) {
  try {
    const res = await apiClient.get(`/recipes/${id}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch recipe info:', error);
    throw error;
  }
}

export { fetchRecipeInfo };
