import React from 'react';
import ProductSpecificationItem from './ProductSpecificationItem';

import './ProductSpecification.scss';

type ProductSpecificationProps = {
  data: any[],
};

const ProductSpecification = (props: ProductSpecificationProps) => {
  const {
    data,
  } = props;

  return (
    <div className="specification_container">
      <div className="specification_content">
        <div className="specification_header">
          <h3 className="title">Spesifikasi Produk</h3>
        </div>
        <div className="specification_items">
          {
            data?.map(
              (item: any) => (
                <ProductSpecificationItem
                  key={`${item.variable}-${item.value}`}
                  variable={item.variable}
                  value={item.value}
                />
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ProductSpecification;
