import axios from 'axios';

const apiRestClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export default apiRestClient;
