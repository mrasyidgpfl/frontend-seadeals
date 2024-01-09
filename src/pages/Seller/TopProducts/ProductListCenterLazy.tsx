import React from 'react';
import CardProductLazy from '../../../components/Cards/CardProductList/CardProductLazy';

const ProductListCenterLazy = () => (
  <div className="container px-1">
    <div className="d-flex justify-content-start gap-4">
      <CardProductLazy />
      <CardProductLazy />
      <CardProductLazy />
      <CardProductLazy />
      <CardProductLazy />
      <CardProductLazy />
    </div>
  </div>
);

export default ProductListCenterLazy;
