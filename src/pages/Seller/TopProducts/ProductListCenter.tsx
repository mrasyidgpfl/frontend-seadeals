import React, { FC } from 'react';
import Card from '../../../components/Cards/Card';

const ProductListCenter:FC<any> = ({ products }) => (
  <div className="container px-1">
    <div className="d-flex justify-content-start gap-4">
      {products.map((product: any) => <div key={product.product.id} className="col-auto mb-3 px-0"><Card data={product} cardType="product-list" /></div>)}
    </div>
  </div>
);

export default ProductListCenter;
