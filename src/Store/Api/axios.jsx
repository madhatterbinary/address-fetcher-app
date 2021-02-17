import axios from 'axios';
const BASE_URL = 'https://api.getAddress.io/autocomplete/'
const instance = axios.create({ BASE_URL });

export const client = {
  default: {
    client: instance,
  }
};

export default instance;
