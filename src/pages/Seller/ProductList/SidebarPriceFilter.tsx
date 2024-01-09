import React, { FC } from 'react';
import PriceFilterBox from './PriceFilterBox';
import URL_PARAM from '../../../constants/URLParamOptions';
import { validateNumParam } from '../../../utils/urlParamValidator';

const SidebarPriceFilter:FC<any> = ({ setParam, minPriceState, maxPriceState }) => {
  const setPriceFilter = (minOrMax:string) => (value:string) => {
    const valueInt = validateNumParam(value);
    setParam.searchParam.set(minOrMax, `${valueInt}`);

    if (minOrMax === URL_PARAM.Min) { minPriceState.setMinPrice(`${valueInt}`); }
    if (minOrMax === URL_PARAM.Max) { maxPriceState.setMaxPrice(`${valueInt}`); }

    setParam.setSearchParam(setParam.searchParam);
  };

  return (
    <div className="bg-white p-4 shadow-sm rounder mb-3 text-start">
      <h5 className="fw-bold mb-3">Batas Harga</h5>
      <PriceFilterBox placeholder="Minimum" setFilter={setPriceFilter(URL_PARAM.Min)} priceState={minPriceState.minPrice} />
      <PriceFilterBox placeholder="Maksimum" setFilter={setPriceFilter(URL_PARAM.Max)} priceState={maxPriceState.maxPrice} />
    </div>
  );
};

export default SidebarPriceFilter;
