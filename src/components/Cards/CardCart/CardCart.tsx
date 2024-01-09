import React from 'react';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';

import './CardCart.scss';
import CardCartItem from './CardCartItem';

type CardCartProps = {
  data: {
    storeId: number;
    storeName: string;
    storeIsChecked: boolean;
    storeItems: any[];
  };
  handleCheckedStore: (storeId: number) => void;
  handleCheckedItem: (id: number) => void
  handleDeleteItem: (storeId: number, id: number) => void;
  handleAmount: (storeId: number, id: number, amount: number) => void;
};

const CardCart = (props: CardCartProps) => {
  const {
    data,
    handleCheckedStore,
    handleCheckedItem,
    handleDeleteItem,
    handleAmount,
  } = props;

  const {
    storeId,
    storeName,
    storeIsChecked,
    storeItems,
  } = data;

  return (
    <div className="card_cart_container">
      <div className="card_cart_content">
        <div className="header">
          <div
            className={`checkbox ${storeIsChecked ? 'checked' : ''}`}
            onClick={() => handleCheckedStore(storeId)}
            role="presentation"
          >
            {
              React.createElement(IconCheck, { className: 'icon_checked' })
            }
          </div>
          <div className="header_name">
            <p className="name">{ storeName }</p>
          </div>
        </div>
        <div className="items_content">
          {
            storeItems.map(
              (item) => (
                <CardCartItem
                  key={`${item.id}-${item.name}`}
                  data={item}
                  storeId={storeId}
                  handleChecked={handleCheckedItem}
                  handleDelete={handleDeleteItem}
                  handleAmount={handleAmount}
                />
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CardCart;
