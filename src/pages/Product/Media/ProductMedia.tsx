import React, { FC, useEffect, useState } from 'react';
import MainMedia from './MainMedia';

import './ProductMedia.scss';
import ModalPhotoZoom from '../../../components/Modal/ModalPhotoZoom/ModalPhotoZoom';

const ProductMedia:FC<any> = ({ photos }) => {
  const [mainImage, setMainImage] = useState({
    id: 0,
    photo_url: '',
    name: '',
  });
  const [isModalPhotoZoomOpen, setIsModalPhotoZoomOpen] = useState(false);

  const openModalPhotoZoom = () => {
    setIsModalPhotoZoomOpen(true);
  };

  const closeModalPhotoZoom = () => {
    setTimeout(() => {
      setIsModalPhotoZoomOpen(false);
    }, 500);
  };

  useEffect(() => {
    if (photos.length > 0) {
      setMainImage(photos[0]);
    }
  }, [photos]);

  return (
    <div className="product__media">
      <MainMedia
        img={mainImage}
        handleClicked={openModalPhotoZoom}
      />
      <div className="d-flex product__media__carousel gap-3">
        {
          photos.length > 0
          && photos.map(
            (photo:any) => (
              <div
                key={photo.id}
                className={`carousel__thumb ${
                  mainImage.id === photo.id
                    ? 'active'
                    : ''
                }`}
                onMouseOver={() => setMainImage(photo)}
                onFocus={() => setMainImage(photo)}
                onClick={openModalPhotoZoom}
                role="presentation"
              >
                <img src={photo?.photo_url} alt="product" />
              </div>
            ),
          )
        }
      </div>
      {
        isModalPhotoZoomOpen
        && (
          <ModalPhotoZoom
            isOpen={isModalPhotoZoomOpen}
            imgUrl={mainImage.photo_url}
            imgName={mainImage.name}
            handleCloseModal={closeModalPhotoZoom}
          />
        )
      }
    </div>
  );
};
export default ProductMedia;
