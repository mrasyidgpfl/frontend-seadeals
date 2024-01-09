class Notifications {
  static PostFavorite(ax: any, data: any) {
    return ax.post('/products/favorites', data);
  }
}

export default Notifications;
