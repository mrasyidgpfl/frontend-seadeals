import axios from './axios';

class Products {
  static GetAllProducts(filter: string) {
    return axios.get(`/products${filter}`);
  }

  static GetProductByID(ax: any, ID: number) {
    return ax.get(`/products/detail/${ID}`);
  }

  static GetProductsBySellerID(SellerID: number, filter: string) {
    return axios.get(`/sellers/${SellerID}/products${filter}`);
  }

  static GetProductsByCategoryID(CategoryID: number, filter: string) {
    return axios.get(`/categories/${CategoryID}/products${filter}`);
  }

  static GetRecommendedProducts(filter: string = '') {
    return axios.get(`/search-recommend-product${filter}`);
  }

  static GetPromotionPrice(ProductID: number) {
    return axios.get(`/products/${ProductID}/promotion-price`);
  }

  static GetSimilarProducts(ProductID: number, filter: string) {
    return axios.get(`/products/${ProductID}/similar-products${filter}`);
  }
}

export default Products;
