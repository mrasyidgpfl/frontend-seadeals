import React, { FC } from 'react';
import SORT_OPTIONS from '../../../constants/ProductListSortOptions';
import validateSorting from '../../../utils/urlParamValidator';

const ProductListSortBar:FC <any> = ({
  setOption, setOrder, setParam, sortSelect,
}) => {
  const { selectedSorting, setSelectedSorting } = sortSelect;
  const { searchParam, setSearchParam } = setParam;
  const handleChange = (value:any) => {
    const { option, order } = validateSorting(value);
    searchParam.set('sort', order);
    searchParam.set('orderBy', option);
    setSearchParam(searchParam);
    setSelectedSorting(value);
    setOption(option);
    setOrder(order);
  };
  return (
    <div className="d-flex gap-3 align-items-center">
      <p>Urutkan</p>
      <select
        onChange={(e) => handleChange(e.target.value)}
        className="form-select dropdown-select"
        value={selectedSorting}
      >
        <option value={SORT_OPTIONS.Top}>Terpopuler</option>
        <option value={SORT_OPTIONS.Cheapest}>Harga Terendah</option>
        <option value={SORT_OPTIONS.Priciest}>Harga Tertinggi</option>
        <option value={SORT_OPTIONS.Recent}>Produk Terbaru</option>
        <option value={SORT_OPTIONS.Oldest}>Pembaruan Terakhir</option>
      </select>
    </div>
  );
};

export default ProductListSortBar;
