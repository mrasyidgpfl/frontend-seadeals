import React, { FC } from 'react';

interface CategorySelect {
  active?:boolean
  title:string
  changeCategory: any
}

const ProductListCatSelect:FC<CategorySelect> = ({ active, title, changeCategory }) => (
  <button
    type="button"
    className={`p-2 ${active ? 'bg-backdrop fw-bold' : ''} mb-1 w-100 text-start`}
    onClick={changeCategory}
  >
    {title}
  </button>
);
ProductListCatSelect.defaultProps = { active: false };

export default ProductListCatSelect;
