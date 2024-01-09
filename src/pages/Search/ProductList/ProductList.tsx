import React from 'react';

import './ProductList.scss';
import Card from '../../../components/Cards/Card';

type ProductListProps = {
  data: any[];
};

const ProductList = (props: ProductListProps) => {
  const { data } = props;

  return (
    <div className="product_list_container">
      <div className="product_list_content">
        <div className="items_content">
          {
            data.map(
              (item) => (
                <Card
                  key={`${item.product.slug}-${item.product.id}`}
                  data={item}
                  cardType="product-list"
                />
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ProductList;
