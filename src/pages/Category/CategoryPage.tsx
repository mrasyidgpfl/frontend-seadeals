import React from 'react';
import Search from '../Search/Search';

import './CategoryPage.scss';

const CategoryPage = () => {
  const optional = 'OPTIONAL';

  return (
    <div className="category_page_container">
      <div className="category_page_content">
        <div className="top_content">
          { optional }
        </div>
        <Search />
      </div>
    </div>
  );
};

export default CategoryPage;
