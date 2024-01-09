import React, { FC } from 'react';
import Modal from '../Modal';
import useSellerVouchers from '../../../hooks/useSellerVouchers';
import LoadingPlain from '../../Loading/LoadingPlain';
import VoucherOptions from './VoucherOptions';

interface SelectVoucherProps {
  sellerID: number,
  show: boolean,
  setShow: (status:boolean)=>void,
  setVoucher: (code:string)=>void,
  selectedID: number,
  total: number,
}

const SelectVoucher:FC<SelectVoucherProps> = ({
  sellerID, show, setShow, setVoucher, selectedID, total,
}) => {
  const { loadingVouchers, vouchers } = useSellerVouchers(sellerID);

  return (
    <Modal
      modalType="select-voucher"
      cancel={() => setShow(false)}
      isOpen={show}
    >
      <div
        className="w-100 px-4 text-end hover-click"
        role="presentation"
        onClick={() => setShow(false)}
      >
        <small className="fs-2">&times;</small>
      </div>
      <div className="w-100 p-5 pt-3">
        <div className="d-flex justify-content-between">
          <p className="mb-4">Voucher yang tersedia untuk toko</p>
          <small className="text-secondary">(pilih salah satu)</small>
        </div>
        {loadingVouchers
          ? (
            <div className="text-center">
              <LoadingPlain height={56} />
              <small>Memuat Voucher Toko..</small>
            </div>
          )
          : (
            <div className="text-start modal_select_body px-2">
              {vouchers.length === 0 && <p className="text-center text-secondary mt-3">Belum Ada Voucher di Toko Ini</p>}
              {vouchers.map((voucher:any) => (
                <VoucherOptions
                  total={total}
                  key={voucher.id}
                  isSelected={selectedID === voucher.id}
                  setOption={() => setVoucher(voucher)}
                  voucher={voucher}
                />
              ))}
            </div>
          )}
      </div>
    </Modal>
  );
};

export default SelectVoucher;
