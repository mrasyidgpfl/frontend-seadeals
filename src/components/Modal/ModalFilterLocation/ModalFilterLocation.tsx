import React, { useState } from 'react';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';
import Button from '../../Button/Button';
import Modal from '../Modal';

import './ModalFilterLocation.scss';

type ModalFilterLocationProps = {
  data: any[],
  isOpen: boolean,
  handleInput: (cityName: string) => void;
  handleDelete: () => void;
  handleCloseModal: () => void;
};

const ModalFilterLocation = (props: ModalFilterLocationProps) => {
  const {
    data,
    isOpen,
    handleInput,
    handleDelete,
    handleCloseModal,
  } = props;

  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(!open);
  };

  const children = () => (
    <div className="modal_filter_location">
      <div className="header">
        <h3 className="title">Filter Lokasi</h3>
        <div className="buttons">
          <Button
            buttonType="secondary"
            text="Hapus Semua"
            handleClickedButton={handleDelete}
          />
          <Button
            buttonType="primary"
            text="Simpan"
            handleClickedButton={handleClose}
          />
        </div>
      </div>
      <div className="content">
        {
          data.map(
            (letter: any) => (
              <div
                key={letter.letter}
                className="letter_content"
              >
                <h5 className="letter_title">{ letter.letter }</h5>
                <div className="letter_items">
                  {
                    letter.items.map(
                      (item: any) => (
                        <div
                          key={`${item.city_id}-${item.city_name}`}
                          className="location_item"
                        >
                          <div
                            className={`checkbox filter ${item.isChecked ? 'checked' : ''}`}
                            onClick={() => handleInput(item.city_name)}
                            role="presentation"
                          >
                            {
                              React.createElement(IconCheck, { className: 'icon_checked' })
                            }
                          </div>
                          <div
                            className="name"
                            onClick={() => handleInput(item.city_name)}
                            role="presentation"
                            data-tip=""
                            data-for="name"
                          >
                            { item.city_name }
                          </div>
                        </div>
                      ),
                    )
                  }
                </div>
              </div>
            ),
          )
        }
      </div>
    </div>
  );

  return (
    <Modal
      modalType="filter-location"
      cancel={handleCloseModal}
      isOpen={open}
    >
      {
        children()
      }
    </Modal>
  );
};

export default ModalFilterLocation;
