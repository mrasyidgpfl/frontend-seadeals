import React, { useState } from 'react';
import Button from '../../Button/Button';
import Modal from '../Modal';

import './ModalNewAddress.scss';

type ModalNewAddressProps = {
  isOpen: boolean,
  subDistrict: string,
  postalCode: string,
  address: string,
  cities: any[],
  city: string,
  provinces: any[],
  province: string,
  handleSelectCity: (e: any) => void,
  handleSelectProvince: (e: any) => void,
  handleCloseModal: () => void,
  handleInputSubDistrict: (e: any) => void,
  handleInputPostalCode: (e: any) => void,
  handleInputAddress: (e: any) => void,
  handleSubmit: () => void,
};

const ModalNewAddress = (props: ModalNewAddressProps) => {
  const {
    isOpen,
    subDistrict,
    postalCode,
    address,
    cities,
    city,
    provinces,
    province,
    handleSelectCity,
    handleSelectProvince,
    handleCloseModal,
    handleInputSubDistrict,
    handleInputPostalCode,
    handleInputAddress,
    handleSubmit,
  } = props;

  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(!open);
  };

  const children = () => (
    <div className="modal-new-address">
      <h3 className="title">Alamat Baru</h3>
      <div className="form_content">
        <form className="form">
          <select
            className="form-select mb-2"
            onChange={handleSelectProvince}
            defaultValue={province}
          >
            {
              provinces.map(
                (prov) => (
                  <option
                    key={prov.province_id}
                    value={prov.province_name}
                  >
                    {prov.province_name}
                  </option>
                ),
              )
            }
          </select>
          {
            province && (
              <select
                className="form-select mb-2"
                onChange={handleSelectCity}
                defaultValue={city}
              >
                {
                  cities.map(
                    (ci) => (
                      <option
                        key={ci.city_id}
                        value={ci.city_name}
                      >
                        {ci.city_name}
                      </option>
                    ),
                  )
                }
              </select>
            )
          }
          <input
            className="form-control mb-2"
            value={subDistrict}
            onChange={handleInputSubDistrict}
            id="sub-district"
            placeholder="Kecamatan"
            autoComplete="new-password"
            required
          />
          <input
            className="form-control mb-2"
            value={postalCode}
            onChange={handleInputPostalCode}
            id="postal-code"
            placeholder="Kode Pos"
            autoComplete="new-password"
            required
          />
          <textarea
            className="form-control mb-2"
            value={address}
            onChange={handleInputAddress}
            id="address"
            placeholder="Isi alamat lengkap"
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
      modalType="new-address"
      cancel={handleCloseModal}
      isOpen={open}
    >
      {
        children()
      }
    </Modal>
  );
};

export default ModalNewAddress;
