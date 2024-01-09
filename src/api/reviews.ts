import axios from './axios';

class Reviews {
  static GetReviewsByProductID(productID: number, filter: string) {
    return axios.get(`/products/${productID}/reviews${filter}`);
  }

  static PostReview(ax: any, data: any) {
    return ax.post('/product/review', data);
  }
}

export default Reviews;
