import React from 'react';

import Card from '../../../components/Cards/Card';
import './Category.scss';

type CategoryProps = {
  data: any[];
};

const Category = (props: CategoryProps) => {
  const { data } = props;

  return (
    <div className="category_container">
      <div className="category_content">
        <div className="header">
          <h3 className="title">Kategori</h3>
        </div>
        <div className="items_content">
          {
            data.map(
              (item) => (
                <Card
                  key={`${item.name}`}
                  data={item}
                  cardType="category"
                />
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};
export default Category;
