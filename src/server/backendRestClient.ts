import axios from 'axios';
import https from 'https';

const restClient = axios.create({
  baseURL: process.env.BACKEND_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default restClient;
