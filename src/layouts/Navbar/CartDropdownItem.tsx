import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/product';
import formatTitle from '../../utils/titleFormatter';

interface Props {
  product: any,
}

const CartDropdownItem:FC<Props> = ({ product }) => (
  <div className="row mb-2">
    <div className="col-auto">
      <div className="cart_item_image">
        <img src={product.image_url} alt={product.product_name} />
      </div>
    </div>
    <div className="col-6 text-overflow-ellipsis normal-link">
      <Link to={`/product/${product.product_slug}`}>
        <small className="fw-bold">{formatTitle(product.product_name)}</small>
      </Link>
    </div>
    <div className="ms-auto col-auto text-end text-secondary-blue">
      <small className="fw-bold">{`Rp${formatPrice(product.price_before_discount)}`}</small>
    </div>
  </div>
);

export default CartDropdownItem;
