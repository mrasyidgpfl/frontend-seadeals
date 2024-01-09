import React, { FC, useState } from 'react';
import './PriceFilterBox.css';

interface PriceBox {
  placeholder: string,
  setFilter: any
  priceState: any
}

const PriceFilterBox:FC<PriceBox> = ({
  placeholder, setFilter, priceState,
}) => {
  const [focus, setFocus] = useState(false);
  // price state changes only when user leaves the input box
  const [priceDisplay, setPriceDisplay] = useState(priceState);

  const applyPriceFilter = (e:any) => {
    setFilter(e.target.value);
    setFocus(!focus);
  };

  return (
    <div className={`d-flex mb-2 rounded border ${focus && 'border-main'}`}>
      <div className="d-flex align-items-center px-2 bg-lightgray fw-bold fs-6 text-secondary rounded-start">
        Rp
      </div>
      <input
        value={priceDisplay}
        type="number"
        placeholder={placeholder}
        className="p-2 w-100 rounded-end shadow-none price__box__input"
        onFocus={() => setFocus(!focus)}
        onBlur={(e) => applyPriceFilter(e)}
        onChange={(e) => setPriceDisplay(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && applyPriceFilter(e)}
      />
    </div>
  );
};

export default PriceFilterBox;
