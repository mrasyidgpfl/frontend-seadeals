import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/product';

interface OrderItem {
  orderItem: {
    id: number,
    product_variant_detail_id: number,
    product_detail: {
      id: number,
      name: string,
      category_id: number,
      category: string,
      slug: string,
      photo_url: string,
      variant: string,
      price: number,
      review_by_user: any,
    },
    quantity: number,
    subtotal: number,
  }
}

const UserOrderItem:FC<OrderItem> = ({ orderItem }) => (
  <div className="row py-3 user_order_item normal-link">
    <div className="col-auto">
      <Link to={`/product/${orderItem?.product_detail?.slug}`}>
        <div className="user_order_item_image">
          <img src={orderItem?.product_detail?.photo_url} alt={orderItem?.product_detail?.name} />
        </div>
      </Link>
    </div>
    <div className="col-8">
      <Link to={`/product/${orderItem?.product_detail?.slug}`}>
        <p className="fw-bold mb-1">{`${orderItem?.product_detail?.name} ${orderItem?.product_detail?.variant}`}</p>
        <p>{`x${orderItem?.quantity}`}</p>
      </Link>
    </div>
    <div className="col-2 ms-auto d-flex align-items-center text-end">
      <p className="w-100">{`Rp ${formatPrice(orderItem?.product_detail?.price)}`}</p>
    </div>
  </div>
);

export default UserOrderItem;
