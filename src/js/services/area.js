import { apiClient } from '../api/axios';

async function fetchAreaList() {
  try {
    const res = await apiClient.get('/areas');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch area list:', error);
    throw error;
  }
}

export { fetchAreaList };
