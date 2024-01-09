import React from 'react';

import './ProductDescription.scss';

type ProductDescriptionProps = {
  description: string,
};

const ProductDescription = (props: ProductDescriptionProps) => {
  const {
    description,
  } = props;

  return (
    <div className="description_container">
      <div className="description_content">
        <div className="description_header">
          <h3 className="title">Deskripsi Produk</h3>
        </div>
        <div className="description_items">
          <p className="item">{ description }</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
