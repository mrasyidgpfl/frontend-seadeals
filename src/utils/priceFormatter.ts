const priceFormat = (price:number) => {
  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  return formatter.format(price);
};

export default priceFormat;
