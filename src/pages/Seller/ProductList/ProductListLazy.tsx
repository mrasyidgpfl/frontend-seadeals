import React from 'react';
import CardProductLazy from '../../../components/Cards/CardProductList/CardProductLazy';

const ProductListLazy = () => (
  <div className="container px-1">
    <div className="row py-3 gap-1">
      {Array(5).fill(0).map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="col-auto px-2 mb-3"><CardProductLazy /></div>
      ))}
    </div>
  </div>
);

export default ProductListLazy;
