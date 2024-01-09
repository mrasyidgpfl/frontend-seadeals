import React from 'react';
import ProductSpecification from './Specification/ProductSpecification';
import ProductDescription from './Description/ProductDescription';

type ProductDetailProps = {
  description: string,
  specification: any[],
};

const ProductDetail = (props: ProductDetailProps) => {
  const {
    description,
    specification,
  } = props;

  return (
    <div className="product_detail_container">
      <div className="product_detail_content">
        <ProductSpecification data={specification} />
        <ProductDescription description={description} />
      </div>
    </div>
  );
};

export default ProductDetail;
