import React, { FC } from 'react';
import UserOrderItem from './UserOrderItem';

interface Props {
  orderItems: any[],
}

const UserOrderItems:FC<Props> = ({ orderItems }) => (
  <>
    {orderItems.length <= 0 && <p>Tidak Ada Barang</p>}
    {orderItems.length > 0 && orderItems.map((item) => (
      <UserOrderItem
        key={item.id}
        orderItem={item}
      />
    ))}
  </>
);

export default UserOrderItems;
