import { apiClient } from '../api/axios';

async function fetchAreaList() {
  try {
    const res = await apiClient.get('/areas');
    console.log(res.data);
    console.log(window.innerWidth);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch area list:', error);
    throw error;
  }
}

export { fetchAreaList };
