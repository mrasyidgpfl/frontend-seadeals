import React from 'react';
import Modal from '../Modal';

import './ModalPhotoZoom.scss';

type ModalPhotoZoomProps = {
  isOpen: boolean,
  imgUrl: string,
  imgName: string,
  handleCloseModal: () => void;
};

const ModalPhotoZoom = (props: ModalPhotoZoomProps) => {
  const {
    isOpen,
    imgUrl,
    imgName,
    handleCloseModal,
  } = props;

  const children = () => (
    <div className="modal_photo_zoom">
      <div className="image_content">
        <img
          className="image"
          src={imgUrl}
          alt={imgName}
        />
      </div>
    </div>
  );

  return (
    <Modal
      modalType="photo-zoom"
      cancel={handleCloseModal}
      isHaveCloseButton
      isOpen={isOpen}
    >
      {
        children()
      }
    </Modal>
  );
};

export default ModalPhotoZoom;
