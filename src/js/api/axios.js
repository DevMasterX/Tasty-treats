// api/axios.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://tasty-treats-backend.p.goit.global/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiClient };
