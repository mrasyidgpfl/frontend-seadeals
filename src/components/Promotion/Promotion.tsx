import React from 'react';

import './Promotion.scss';

type PromotionProps = {
  promotionType: string,
  text: string,
};

const Promotion = (props: PromotionProps) => {
  const {
    promotionType,
    text,
  } = props;

  return (
    <div className="promotion_container">
      <div className="promotion_content">
        <p className={`text ${promotionType}`}>
          { text }
        </p>
      </div>
    </div>
  );
};

export default Promotion;
