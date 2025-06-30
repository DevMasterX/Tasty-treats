import { apiClient } from '../api/axios';

async function sendFormData(data) {
  try {
    const response = await apiClient.post('/orders/add', data);
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    console.log('Server response:', error?.response?.data);
    throw error;
  }
}

export { sendFormData };
