import React, { FC } from 'react';

interface SummaryItem {
  keyName:string,
  value:string,
  keyClass:string,
  valueClass:string,
}

const UserOrderSummaryItem:FC<SummaryItem> = ({
  keyName, value, keyClass, valueClass,
}) => (
  <div className="row pt-3">
    <div className="col-8 ms-auto">
      <small className={keyClass}>{keyName}</small>
    </div>
    <div className="col-3">
      <p className={valueClass}>{value}</p>
    </div>
  </div>
);

export default UserOrderSummaryItem;
