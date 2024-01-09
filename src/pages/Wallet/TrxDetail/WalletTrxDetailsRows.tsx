import React from 'react';

type DetailProp = {
  column: string,
  value: string,
};

const WalletTrxDetailsRows = ({ column, value }:DetailProp) => (
  <div className={`d-flex justify-content-between ${column === 'Total' && 'fw-bold'}`}>
    <p className="mb-2">{column}</p>
    <p className="mb-2">{value}</p>
  </div>
);

export default WalletTrxDetailsRows;
