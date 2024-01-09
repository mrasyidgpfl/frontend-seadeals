import React, { useState } from 'react';
import Button from '../../Button/Button';
import Modal from '../Modal';

import './ModalEditAddress.scss';

type ModalEditAddressProps = {
  isOpen: boolean,
  newPostalCode: string,
  newAddress: string,
  handleNewPostalCode: (e: any) => void,
  handleNewAddress: (e: any) => void,
  handleCloseModal: () => void,
  handleSubmit: () => void,
};

const ModalEditAddress = (props: ModalEditAddressProps) => {
  const {
    isOpen,
    newPostalCode,
    newAddress,
    handleNewPostalCode,
    handleNewAddress,
    handleCloseModal,
    handleSubmit,
  } = props;

  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(!open);
  };

  const children = () => (
    <div className="modal-edit-address">
      <h5 className="title">Sunting Alamat</h5>
      <div className="form_content">
        <form className="form">
          <input
            className="form-control mb-2"
            value={newPostalCode}
            onChange={handleNewPostalCode}
            id="postal-code"
            placeholder="Isi nomor kode pos baru"
            autoComplete="new-password"
            required
          />
          <textarea
            className="form-control mb-2"
            value={newAddress}
            onChange={handleNewAddress}
            id="address"
            placeholder="Isi alamat lengkap baru"
            autoComplete="new-password"
            required
          />
        </form>
      </div>
      <div className="d-flex justify-content-end gap-3 mt-4">
        <Button
          buttonType="primary alt"
          text="Tutup"
          handleClickedButton={handleClose}
        />
        <Button
          buttonType="primary"
          text="Simpan"
          handleClickedButton={handleSubmit}
        />
      </div>
    </div>
  );

  return (
    <Modal
      modalType="edit-address"
      cancel={handleCloseModal}
      isOpen={open}
    >
      {
        children()
      }
    </Modal>
  );
};

export default ModalEditAddress;
