const PRODUCT_SPECIFICATION = [
  {
    variable: 'Kategori',
    value: '',
  },
  {
    variable: 'Kondisi',
    value: '',
  },
  {
    variable: 'Panjang (cm)',
    value: '',
  },
  {
    variable: 'Lebar (cm)',
    value: '',
  },
  {
    variable: 'Tinggi (cm)',
    value: '',
  },
  {
    variable: 'Berat (gr)',
    value: '',
  },
  {
    variable: 'Stok Total',
    value: '',
  },
  {
    variable: 'Dikirim Dari',
    value: '',
  },
];

const SELLER_INFO = [
  {
    classes: 'rating',
    variable: 'Penilaian',
    value: '',
  },
  {
    classes: 'followers',
    variable: 'Pengikut',
    value: '',
  },
  {
    classes: 'join',
    variable: 'Bergabung',
    value: '',
  },
  {
    classes: 'total_reviewers',
    variable: 'Banyak Penilaian',
    value: '',
  },
  {
    classes: 'total_product',
    variable: 'Banyak Produk',
    value: '',
  },
];

const REVIEW_FILTER_ITEMS = [
  {
    id: 0,
    value: 'Semua',
    filter: '',
  },
  {
    id: 1,
    value: '1 Bintang',
    filter: '&rating=1',
  },
  {
    id: 2,
    value: '2 Bintang',
    filter: '&rating=2',
  },
  {
    id: 3,
    value: '3 Bintang',
    filter: '&rating=3',
  },
  {
    id: 4,
    value: '4 Bintang',
    filter: '&rating=4',
  },
  {
    id: 5,
    value: '5 Bintang',
    filter: '&rating=5',
  },
  {
    id: 6,
    value: 'Dengan Komentar',
    filter: '&withDescOnly=true',
  },
  {
    id: 7,
    value: 'Dengan Foto',
    filter: '&withImgOnly=true',
  },
];

export {
  PRODUCT_SPECIFICATION,
  SELLER_INFO,
  REVIEW_FILTER_ITEMS,
};
