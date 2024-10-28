import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getUserDetails = (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
};

export const getUserTransactions = (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}/transactions`);
};
