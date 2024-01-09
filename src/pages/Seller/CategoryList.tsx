import React, { FC } from 'react';
import CardCategory from '../../components/Cards/CardCategory/CardCategory';
import CardCategoryLazy from '../../components/Cards/CardCategory/CardCategoryLazy';

const CategoryList:FC<any> = ({ loading, categories, setCategory }) => (
  <div className="container d-flex gap-3 px-0 py-3">
    {
      loading ? <CardCategoryLazy />
        : categories.map((category:any) => {
          const data = { name: category.name, icon_url: category.icon_url };
          return (
            <button
              key={category.id}
              type="button"
              className="hover-click bg-inherit"
              onClick={() => setCategory(category.id)}
            >
              <CardCategory data={data} />
            </button>
          );
        })
    }
  </div>
);

export default CategoryList;
