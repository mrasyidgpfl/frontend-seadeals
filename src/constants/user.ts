const PHOTO_DEFAULT = 'https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/avatars%2Fuser%2Fanonym.jpeg?alt=media&token=66dbb36a-2ac1-4b1f-ad67-b2834eefdcef';

const USER_SIDEBAR = [
  {
    name: 'Akun Saya',
    link: '/user/profile',
  },
  {
    name: 'Alamat Saya',
    link: '/user/addresses',
  },
  {
    name: 'My Wallet',
    link: '/wallet',
  },
  {
    name: 'Pesanan Saya',
    link: '/user/order-history',
  },
];

const ORDER_HISTORY_NAVIGATION = [
  {
    params: 'all',
    name: 'Semua',
  },
  {
    params: 'on-process',
    name: 'Dikemas',
  },
  {
    params: 'delivered',
    name: 'Dikirim',
  },
  {
    params: 'completed',
    name: 'Selesai',
  },
  {
    params: 'canceled',
    name: 'Dibatalkan',
  },
];

export {
  PHOTO_DEFAULT,
  USER_SIDEBAR,
  ORDER_HISTORY_NAVIGATION,
};
