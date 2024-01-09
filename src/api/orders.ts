class Orders {
  static GetAllOrdersByUser(ax: any, filter: string = '') {
    return ax.get(`/user/orders${filter}`);
  }

  static PostFinishOrder(ax: any, data: any) {
    return ax.post('/user/finish/orders', data);
  }

  static PostComplaintOrder(ax: any, data:any) {
    return ax.post('/request-refund/orders', data);
  }
}

export default Orders;
