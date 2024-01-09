import React, { FC } from 'react';
import UserOrderSummaryItem from './UserOrderSummaryItem';
import formatTitle from '../../../utils/titleFormatter';
import { formatPrice } from '../../../utils/product';

interface Props {
  order: any,
}

const UserOrderSummary:FC<Props> = ({ order }) => (
  <div className="border-top text-end">
    <UserOrderSummaryItem
      keyName="Metode Pembayaran"
      keyClass=""
      value={formatTitle(order?.transaction?.payment_method)}
      valueClass=""
    />
    <UserOrderSummaryItem
      keyName="Subtotal Produk"
      keyClass=""
      value={`Rp ${formatPrice(order?.total_order_price)}`}
      valueClass=""
    />
    <UserOrderSummaryItem
      keyName="Pengiriman"
      keyClass=""
      value={`Rp ${formatPrice(order?.total_delivery)}`}
      valueClass=""
    />
    {order.voucher
      && (
      <UserOrderSummaryItem
        keyName="Voucher"
        keyClass=""
        value={`Rp ${formatPrice(order?.voucher.amount_reduced)}`}
        valueClass=""
      />
      )}
    <UserOrderSummaryItem
      keyName="Total Pesanan"
      keyClass="fw-bold fs-5"
      value={`Rp ${formatPrice((order.total_order_price_after_disc + order.total_delivery) || 0)}`}
      valueClass="fw-bold fs-5 text-accent"
    />
  </div>
);

export default UserOrderSummary;
