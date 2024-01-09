import React from 'react';

type ProductSpecificationItemProps = {
  variable: string,
  value: string,
};

const ProductSpecificationItem = (props: ProductSpecificationItemProps) => {
  const {
    variable,
    value,
  } = props;

  return (
    <div className="item">
      <p className="variable">{ variable }</p>
      <p className="value">{ value }</p>
    </div>
  );
};

export default ProductSpecificationItem;
