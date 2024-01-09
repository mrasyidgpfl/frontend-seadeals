import axios from 'axios';

const citiesToken = '31a794f6578aa880b5917d1e914431cc';

const CITY_AXIOS_CONFIGURATION = {
  baseURL: 'https://ship.spacexkode.my.id',
  headers: {
    'Api-Key': citiesToken,
  },
};

const cityService = axios.create(CITY_AXIOS_CONFIGURATION);

export default cityService;
