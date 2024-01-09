import React, { FC } from 'react';
import Card from '../../../components/Cards/Card';

interface ProductListProps {
  products: any
}

const ProductList: FC<ProductListProps> = ({ products }) => (
  <div className="container px-1">
    <div className="row py-3">
      {products.map((product: any) => <div key={product.product.id} className="col-auto px-2 mb-3"><Card data={product} cardType="product-list" /></div>)}
    </div>
  </div>
);

export default ProductList;
