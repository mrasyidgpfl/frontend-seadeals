import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';
import { ReactComponent as IconDelete } from '../../../assets/svg/icon_delete.svg';
import { formatPrice, formatPriceWithCurrency } from '../../../utils/product';
import Form from '../../Form/Form';
import Promotion from '../../Promotion/Promotion';

type CardCartItemProps = {
  data: {
    id: number;
    slug: string;
    variant: string;
    name: string;
    imgUrl: string;
    amount: number;
    isChecked: boolean;
    pricePromotion: number;
    priceBase: number;
    discount: number;
  };
  storeId: number;
  handleChecked: (id: number) => void;
  handleDelete: (storeId: number, id: number) => void;
  handleAmount: (storeId: number, id: number, amount: number) => void;
};

const CardCartItem = (props: CardCartItemProps) => {
  const {
    data,
    storeId,
    handleChecked,
    handleDelete,
    handleAmount,
  } = props;

  const {
    id,
    name,
    slug,
    variant,
    imgUrl,
    amount,
    isChecked,
    pricePromotion,
    priceBase,
    discount,
  } = data;

  const navigate = useNavigate();

  const amountItems = [
    {
      inputType: 'number',
      name: 'amount',
      label: 'Jumlah',
    },
  ];

  const handleInput = (event: any) => {
    handleAmount(storeId, id, event.target.value);
  };

  const goToProductPage = () => {
    navigate(`/product/${slug}`);
  };

  return (
    <div className="card_cart_item_container">
      <div className="card_cart_item_content">
        <div
          className={`checkbox ${isChecked ? 'checked' : ''}`}
          onClick={() => handleChecked(id)}
          role="presentation"
        >
          {
            React.createElement(IconCheck, { className: 'icon_checked' })
          }
        </div>
        <div className="first_content">
          <img
            className="image"
            src={imgUrl}
            alt={name}
            onClick={goToProductPage}
            role="presentation"
          />
          <div className="description">
            {
              discount
              && (
                <Promotion
                  promotionType="orange"
                  text={`${formatPrice(discount)} OFF`}
                />
              )
            }
            <div
              className="name"
              onClick={goToProductPage}
              role="presentation"
            >
              {name}
            </div>
            <p className="variant">{variant}</p>
          </div>
        </div>
        <div className="second_content">
          <p className="title">Harga Satuan:</p>
          {
            priceBase !== pricePromotion
            && (
              <p className="base">{ formatPriceWithCurrency(priceBase) }</p>
            )
          }
          <p className="price">{ formatPriceWithCurrency(pricePromotion) }</p>
        </div>
        <div className="third_content">
          <p className="title">Jumlah:</p>
          <div className="amount">
            <Form
              formType="amount-item-cart"
              items={amountItems}
              values={{ amount }}
              handleInput={handleInput}
            />
          </div>
        </div>
        <div className="fourth_content">
          <p className="title">Total Harga:</p>
          {
            priceBase !== pricePromotion
            && (
              <p className="base">{ formatPriceWithCurrency(priceBase * amount) }</p>
            )
          }
          <p className="total_price">{ formatPriceWithCurrency(pricePromotion * amount) }</p>
        </div>
        <div
          className="fifth_content"
          onClick={() => handleDelete(storeId, id)}
          role="presentation"
        >
          {
            React.createElement(IconDelete, { className: 'icon_delete' })
          }
        </div>
      </div>
    </div>
  );
};

export default CardCartItem;
