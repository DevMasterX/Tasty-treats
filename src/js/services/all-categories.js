import { apiClient } from '../api/axios';

async function fetchAllCategoriesList() {
  try {
    const res = await apiClient.get('/categories');
    return res.data;
  } catch (error) {
    console.error('Failed to fetchall categories list:', error);
    throw error;
  }
}

export { fetchAllCategoriesList };
