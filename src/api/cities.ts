import cityService from '../utils/request_cities';

class Cities {
  static GetAllCities() {
    return cityService.get('/cities');
  }
}

export default Cities;
