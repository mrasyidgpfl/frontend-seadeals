import React from 'react';
import { useNavigate } from 'react-router-dom';

import { formatSoldCount, formatPrice } from '../../../utils/product';
import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';

import './CardProductList.scss';

type CardProductListProps = {
  data: {
    min_price: number,
    max_price: number,
    product: {
      id: number,
      price: number,
      name: string,
      slug: string,
      media_url: string,
      city: string,
      rating: number,
      total_reviewer: number,
      total_sold: number,
    }
  },
};

const CardProductList = (props: CardProductListProps) => {
  const { data } = props;
  const { product } = data;
  const minPrice = data.min_price;
  const maxPrice = data.max_price;
  const {
    name,
    slug,
    city,
    rating,
  } = product;
  const mediaUrl = product.media_url;
  const totalSold = product.total_sold;
  const navigate = useNavigate();

  const goToProductPage = () => {
    navigate(`/product/${slug}`);
  };

  return (
    <div
      className="card_product_list_container"
      onClick={goToProductPage}
      role="presentation"
    >
      <div className="card_product_list_content">
        <img
          className="image"
          src={mediaUrl}
          alt={slug}
        />
        <div className="name_content">
          <p className="name">{ name }</p>
        </div>
        <div className="center_content">...</div>
        <div className="price_container">
          <div className="price_content">
            <p className="currency">Rp</p>
            <p className="price">{ formatPrice(minPrice) }</p>
          </div>
          {
            minPrice !== maxPrice
            && (
              <div className="price_content">
                <p className="connector">&nbsp;-&nbsp;</p>
                <p className="currency">Rp</p>
                <p className="price">{ formatPrice(maxPrice) }</p>
              </div>
            )
          }
        </div>
        <div className="bottom_content">
          <div className="rating">
            {
              React.createElement(IconStar, { className: 'iconRating' })
            }
            { rating }
          </div>
          <p className="sold_count">{ formatSoldCount(totalSold) }</p>
        </div>
        <div className="city">{ city }</div>
      </div>
    </div>
  );
};

export default CardProductList;
