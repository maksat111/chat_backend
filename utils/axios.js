const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': "*/*",
  }
});

module.exports = axiosInstance;