import axios from './axios';

class ProductCategories {
  static GetAllCategories() {
    return axios.get('/categories');
  }
}

export default ProductCategories;
