import axios from 'axios';

const baseApiClient = axios.create({
  baseURL: 'http://localhost:5014',
});

export default baseApiClient;
