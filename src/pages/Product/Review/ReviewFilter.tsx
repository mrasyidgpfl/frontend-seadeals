import React from 'react';
import Button from '../../../components/Button/Button';
import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';

type ReviewFilterProps = {
  items: any[],
  value: string,
  rating: number,
  totalReviewer: number,
  handleFilter: (filter: string) => void,
};

const ReviewFilter = (props: ReviewFilterProps) => {
  const {
    items,
    value,
    rating,
    totalReviewer,
    handleFilter,
  } = props;

  return (
    <div className="review_filter_container">
      <div className="review_filter_content">
        <div className="rating_content">
          <div className="text">
            <div className="rating">
              { rating }
              <p className="next">&nbsp;dari 5</p>
            </div>
            <p className="total">
              { totalReviewer }
              &nbsp;Penilaian
            </p>
            <div className="stars">
              {
                Array(Math.round(rating)).fill(0).map(
                  (item, index) => React.createElement(
                    IconStar,
                    {
                      key: `star-${Math.round(rating) - index}`,
                      className: 'star',
                    },
                  ),
                )
              }
              {
                Array(5 - Math.round(rating)).fill(0).map(
                  (_item, index) => React.createElement(
                    IconStar,
                    {
                      className: 'star white',
                      key: `star-white-${5 - Math.round(rating) - index}`,
                    },
                  ),
                )
              }
            </div>
          </div>
        </div>
        <div className="filter">
          {
            items.map(
              (item: any) => (
                <Button
                  key={`${item.id}-${item.value}`}
                  buttonType={`primary ${value !== item.filter ? 'alt' : ''}`}
                  text={item.value}
                  handleClickedButton={() => handleFilter(item.filter)}
                />
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ReviewFilter;
