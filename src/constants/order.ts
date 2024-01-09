const ORDER_STATUS = [
  {
    onDatabase: 'waiting for payment',
    display: 'Menunggu Pembayaran',
  },
  {
    onDatabase: 'waiting for seller',
    display: 'Dikemas',
  },
  {
    onDatabase: 'on delivery',
    display: 'Dikirim',
  },
  {
    onDatabase: 'delivered',
    display: 'Diterima',
  },
  {
    onDatabase: 'complained',
    display: 'Dikomplain',
  },
  {
    onDatabase: 'refunded',
    display: 'Dibatalkan',
  },
  {
    onDatabase: 'done',
    display: 'Selesai',
  },
];

export default ORDER_STATUS;
