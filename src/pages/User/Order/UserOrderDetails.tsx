import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import shopIcon from '../../../assets/svg/shop.svg';
import UserOrderItems from './UserOrderItems';
import UserOrderSummary from './UserOrderSummary';

interface Props {
  order: any,
}

const UserOrderDetails:FC<Props> = ({ order }) => (
  <div className="py-3 w-100 p-4 bg-white shadow-sm">
    <div className="d-flex justify-content-between border-bottom">
      <div className="normal-link py-2">
        <Link to={`/toko/${order?.seller_id}`}>
          <div className="d-flex gap-2">
            <img src={shopIcon} alt="Nama Toko" height="20px" />
            <span className="fw-bold">{order?.seller?.name}</span>
          </div>
        </Link>
      </div>
      <small className="py-2">{`No.Pesanan ${order?.id}`}</small>
    </div>
    <div>
      <UserOrderItems orderItems={order?.order_items || []} />
    </div>
    <UserOrderSummary order={order} />
  </div>
);

export default UserOrderDetails;
