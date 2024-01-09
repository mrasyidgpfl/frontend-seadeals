class Users {
  static GetProfiles(ax: any) {
    return ax.get('/user/profiles');
  }

  static UpdateProfile(ax: any, data:any) {
    return ax.patch('/user/change-profiles', data);
  }

  static ChangePassword(ax: any, data:any) {
    return ax.patch('/user/change-password', data);
  }
}

export default Users;
