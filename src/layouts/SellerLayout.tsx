import React from 'react';
import { Outlet } from 'react-router-dom';

const SellerLayout = () => (
  <div>
    <h1>Seller</h1>
    <Outlet />
  </div>
);

export default SellerLayout;
