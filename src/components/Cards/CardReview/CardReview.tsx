import React, { useState } from 'react';

import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';
import './CardReview.scss';
import ModalPhotoZoom from '../../Modal/ModalPhotoZoom/ModalPhotoZoom';

type CardReviewProps = {
  data: any,
};

const CardReview = (props: CardReviewProps) => {
  const { data } = props;
  const {
    name,
    rating,
    createdAt,
    avatarUrl,
    description,
    imgUrl,
    imgName,
  } = data;

  const [isModalPhotoZoomOpen, setIsModalPhotoZoomOpen] = useState(false);

  const openModalPhotoZoom = () => {
    setIsModalPhotoZoomOpen(true);
  };

  const closeModalPhotoZoom = () => {
    setTimeout(() => {
      setIsModalPhotoZoomOpen(false);
    }, 500);
  };

  return (
    <div className="card_review_container">
      <div className="card_review_content">
        <div className="avatar_content">
          <img
            className="avatar"
            src={avatarUrl}
            alt={name}
          />
        </div>
        <div className="center_content">
          <p className="name">{ name }</p>
          <div className="rating">
            {
              Array(rating).fill(0).map(
                (item, index) => React.createElement(
                  IconStar,
                  {
                    key: `star-${rating - index}`,
                    className: 'star',
                  },
                ),
              )
            }
            {
              Array(5 - rating).fill(0).map(
                (_item, index) => React.createElement(
                  IconStar,
                  {
                    className: 'star white',
                    key: `star-white-${5 - rating - index}`,
                  },
                ),
              )
            }
          </div>
          <p className="created">{ createdAt }</p>
          <p className="description">{ description }</p>
        </div>
        <div
          className="image_content"
          onClick={openModalPhotoZoom}
          role="presentation"
        >
          {
            imgUrl
            && (
              <img
                className="image"
                src={imgUrl}
                alt={imgName}
              />
            )
          }
        </div>
      </div>
      {
        isModalPhotoZoomOpen
        && (
          <ModalPhotoZoom
            isOpen={isModalPhotoZoomOpen}
            imgUrl={imgUrl}
            imgName={imgName}
            handleCloseModal={closeModalPhotoZoom}
          />
        )
      }
    </div>
  );
};

export default CardReview;
