import { apiClient } from '../api/axios';

async function sendRatingFormData(id, data) {
  try {
    const response = await apiClient.patch(`/recipes/${id}/rating`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    console.log('Server response:', error?.response?.data);
    throw error;
  }
}

export { sendRatingFormData };
