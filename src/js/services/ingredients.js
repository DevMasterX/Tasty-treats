import { apiClient } from '../api/axios';

async function fetchIngredients() {
  try {
    const res = await apiClient.get('/ingredients');
    return res.data;
  } catch (error) {
    console.error(':', error);
    throw error;
  }
}
export { fetchIngredients };
