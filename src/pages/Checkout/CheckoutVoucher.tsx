import React, { FC, useState } from 'react';
import Button from '../../components/Button/Button';
import SelectGlobalVoucher from '../../components/Modal/ModalCheckoutOptions/SelectGlobalVoucher';

interface CheckoutVoucherProps {
  selectedGlobalVoucher: any,
  updateGlobalVoucher: (code:string)=>void,
  subtotal: number
}

const CheckoutVoucher:FC<CheckoutVoucherProps> = ({
  selectedGlobalVoucher, updateGlobalVoucher, subtotal,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleChangeVoucher = (voucherData: any) => {
    updateGlobalVoucher(voucherData);
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-sm mb-3">
      {
        showModal && (
        <SelectGlobalVoucher
          total={subtotal}
          show={showModal}
          setShow={setShowModal}
          setVoucher={handleChangeVoucher}
          selectedID={selectedGlobalVoucher?.id || 0}
        />
        )
      }
      <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
        <p className="fs-5 px-3">Voucher SeaDeals</p>
        <div className="d-flex gap-4">
          <div className="border rounded p-2">
            {
              selectedGlobalVoucher.id
                ? (
                  <code className="fs-6 text-dark">{selectedGlobalVoucher?.code}</code>
                )
                : <p className="text-secondary">voucher belum dipilih</p>
            }
          </div>
          <Button
            text="Pilih"
            buttonType="plain w-auto p-2 text-secondary-blue"
            handleClickedButton={() => setShowModal(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutVoucher;
