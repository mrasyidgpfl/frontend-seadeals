import React, { FC } from 'react';
import ProductListCenter from './ProductListCenter';
import ProductListCenterLazy from './ProductListCenterLazy';

const SellerTopProductList:FC<any> = ({ loading, products, clickToScroll }) => (
  <div className="py-3">
    <div className="container text-start px-0">
      <p className="fw-bold mb-3 fs-5 text-secondary">Produk Terlaris</p>
    </div>
    {loading
      ? <ProductListCenterLazy />
      : <ProductListCenter products={products} />}
    <div className="text-end container text-main py-2 pb-3">
      <button
        type="button"
        className="mb-0 fw-bold bg-backdrop"
        onClick={clickToScroll}
      >
        Lihat Semua &#8250;
      </button>
    </div>
  </div>
);

export default SellerTopProductList;
