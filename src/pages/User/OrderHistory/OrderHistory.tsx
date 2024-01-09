import React from 'react';
// import { useNavigate } from 'react-router-dom';
import OrderHistoryNavigation from './OrderHistoryNavigation/OrderHistoryNavigation';

import './OrderHistory.scss';
import OrderHistoryItems from './OrderHistoryItems/OrderHistoryItems';

const OrderHistory = () => {
  // const navigate = useNavigate();
  const pp = '';
  console.log(pp);

  return (
    <div className="order-history_container">
      <div className="order-history_content">
        <OrderHistoryNavigation />
        <OrderHistoryItems />
      </div>
    </div>
  );
};

export default OrderHistory;
