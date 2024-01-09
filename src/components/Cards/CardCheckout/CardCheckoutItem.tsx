import React from 'react';
import { formatPriceWithCurrency } from '../../../utils/product';
import formatTitle from '../../../utils/titleFormatter';

type CardCheckoutItemProps = {
  data: {
    id: number;
    product_name: string;
    image_url: string;
    price_per_item: number;
    quantity: number;
    subtotal: number;
  };
};

const CardCartItem = (props: CardCheckoutItemProps) => {
  const {
    data,
  } = props;

  const {
    product_name: name,
    image_url: imgUrl,
    price_per_item: price,
    quantity: amount,
    subtotal,
  } = data;

  return (
    <div className="card_cart_item_container">
      <div className="card_cart_item_content">
        <div className="first_content">
          <img
            className="image"
            src={imgUrl}
            alt={name}
          />
          <div className="description">
            <p className="name">{formatTitle(name)}</p>
          </div>
        </div>
        <div className="second_content">
          <p className="title">Harga Satuan:</p>
          <p className="price">{ formatPriceWithCurrency(price) }</p>
        </div>
        <div className="third_content">
          <p className="title">Jumlah:</p>
          <p className="price">{ amount }</p>
        </div>
        <div className="fourth_content">
          <p className="title">Total Harga:</p>
          <p className="total_price">{ formatPriceWithCurrency(subtotal) }</p>
        </div>
      </div>
    </div>
  );
};

export default CardCartItem;
