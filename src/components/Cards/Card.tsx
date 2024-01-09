import React from 'react';

import CardCategory from './CardCategory/CardCategory';
import CardProductList from './CardProductList/CardProductList';
import CardCart from './CardCart/CardCart';
import CardReview from './CardReview/CardReview';

type CardRequiredProps = {
  data: any;
  cardType: string;
};

type CardOptionalProps = {
  // eslint-disable-next-line react/require-default-props
  handleCheckedStore?: any;
  // eslint-disable-next-line react/require-default-props
  handleCheckedItem?: any;
  // eslint-disable-next-line react/require-default-props
  handleDeleteItem?: any;
  // eslint-disable-next-line react/require-default-props
  handleAmount?: any;
};

interface CardProps
  extends CardRequiredProps,
  CardOptionalProps {}

const defaultProps: CardOptionalProps = {
  handleCheckedStore: null,
  handleCheckedItem: null,
  handleDeleteItem: null,
  handleAmount: null,
};

const Card = (props: CardProps) => {
  const {
    data,
    cardType,
    handleCheckedStore,
    handleCheckedItem,
    handleDeleteItem,
    handleAmount,
  } = props;

  return (
    <div className="card_container">
      {
        cardType === 'category'
        && (
          <CardCategory data={data} />
        )
      }
      {
        cardType === 'product-list'
        && (
          <CardProductList data={data} />
        )
      }
      {
        cardType === 'cart'
        && (
          <CardCart
            data={data}
            handleCheckedStore={handleCheckedStore}
            handleCheckedItem={handleCheckedItem}
            handleDeleteItem={handleDeleteItem}
            handleAmount={handleAmount}
          />
        )
      }
      {
        cardType === 'review'
        && (
          <CardReview data={data} />
        )
      }
    </div>
  );
};

Card.defaultProps = defaultProps;

export default Card;
