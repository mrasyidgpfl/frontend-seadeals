import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';

import './CardCart.scss';
import { formatPriceWithCurrency } from '../../../utils/product';
import Button from '../../Button/Button';

type CardCartAllProps = {
  totalProduct: number;
  totalPricePromotion: number;
  totalPriceBase: number;
  isAllProductsChecked: boolean;
  handleCheckedAllProducts: () => void;
};

const CardCartAll = (props: CardCartAllProps) => {
  const {
    totalProduct,
    totalPricePromotion,
    totalPriceBase,
    isAllProductsChecked,
    handleCheckedAllProducts,
  } = props;

  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="card_cart_container all">
      <div className="card_cart_content">
        <div className="header all">
          <div className="left_content">
            <div
              className={`checkbox ${isAllProductsChecked ? 'checked' : ''}`}
              onClick={() => handleCheckedAllProducts()}
              role="presentation"
            >
              {
                React.createElement(IconCheck, { className: 'icon_checked' })
              }
            </div>
            <div className="header_name">
              <p className="name">Semua Produk</p>
            </div>
          </div>
          <div className="right_content">
            <div className="total_product">
              <p className="title">Total Produk:</p>
              <p className="amount">
                { totalProduct }
                {' '}
                Produk
              </p>
            </div>
            <div className="total_price">
              <p className="title">Total Harga:</p>
              {
                totalPriceBase !== totalPricePromotion
                && (
                  <p className="base">{ formatPriceWithCurrency(totalPriceBase) }</p>
                )
              }
              <p className="amount">{ formatPriceWithCurrency(totalPricePromotion) }</p>
            </div>
            <Button
              buttonType="primary"
              text="CHECKOUT"
              handleClickedButton={goToCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCartAll;
