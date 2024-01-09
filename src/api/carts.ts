class Carts {
  static PostCartItem(ax: any, data: any) {
    return ax.post('/user/cart', data);
  }

  static DeleteCartItem(ax: any, data: any) {
    return ax.delete('/user/cart', { data });
  }

  static GetCartItem(ax: any) {
    return ax.get('/user/cart');
  }

  static PatchCartItem(ax: any, data: any) {
    return ax.patch('/user/cart', data);
  }
}

export default Carts;
