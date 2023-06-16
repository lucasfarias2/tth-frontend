import axios from 'axios';

const apiRestClient = axios.create({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export default apiRestClient;
