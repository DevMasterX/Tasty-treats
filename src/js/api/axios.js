import axios from 'axios';

// axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api/';

const apiClient = axios.create({
  baseURL: 'https://tasty-treats-backend.p.goit.global/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiClient };
