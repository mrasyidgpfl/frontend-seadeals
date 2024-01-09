import React from 'react';
import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';
import Button from '../../Button/Button';

type FilterRatingProps = {
  filterClass: string,
  values: any,
  handleInput: (rating: number) => void;
  handleDelete: () => void;
};

const FilterRating = (props: FilterRatingProps) => {
  const {
    filterClass,
    values,
    handleInput,
    handleDelete,
  } = props;

  return (
    <div className="filter_rating_container">
      <div className="filter_rating_content">
        <h3 className="title">Penilaian</h3>
        <div className={`items_content ${filterClass}`}>
          {
            Array(5).fill(0).map(
              (item, index) => (
                <div
                  key={`rating-${5 - index}`}
                  className={`rating ${values === 5 - index ? 'active' : ''}`}
                  onClick={() => handleInput(5 - index)}
                  role="presentation"
                >
                  <div className="icons">
                    {
                      Array(5 - index).fill(0).map(
                        (el, idx) => (
                          React.createElement(IconStar, {
                            className: 'star',
                            key: `star-${5 - index}-${el}-${5 - idx}`,
                          })
                        ),
                      )
                    }
                    {
                      Array(index).fill(0).map(
                        (el, idx) => (
                          React.createElement(IconStar, {
                            className: 'star white',
                            key: `star-white-${5 - index}-${el}-${5 - idx}`,
                          })
                        ),
                      )
                    }
                  </div>
                  <p className="number">{`${5 - index} ${5 - index < 5 ? 'Keatas' : ''}`}</p>
                </div>
              ),
            )
          }
        </div>
        <Button
          buttonType="secondary"
          text="Hapus"
          handleClickedButton={handleDelete}
        />
      </div>
    </div>
  );
};

export default FilterRating;
