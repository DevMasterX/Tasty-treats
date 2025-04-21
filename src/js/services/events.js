import { apiClient } from '../api/axios';

async function fetchEvents() {
  try {
    const res = await apiClient.get('/events');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
}

export { fetchEvents };
