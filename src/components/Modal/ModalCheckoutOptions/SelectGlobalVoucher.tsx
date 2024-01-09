import React, { FC } from 'react';
import Modal from '../Modal';
import LoadingPlain from '../../Loading/LoadingPlain';
import VoucherOptions from './VoucherOptions';
import useGlobalVouchers from '../../../hooks/useGlobalVouchers';

interface SelectVoucherProps {
  show: boolean,
  setShow: (status:boolean)=>void,
  setVoucher: (code:string)=>void,
  selectedID: number,
  total: number,
}

const SelectGlobalVoucher:FC<SelectVoucherProps> = ({
  show, setShow, setVoucher, selectedID, total,
}) => {
  const { loadingVouchers, vouchers } = useGlobalVouchers();

  return (
    <Modal
      modalType="select-global-voucher"
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
          <p className="mb-4">Voucher SeaDeals</p>
          <small className="text-secondary">(pilih salah satu)</small>
        </div>
        {loadingVouchers
          ? (
            <div className="text-center">
              <LoadingPlain height={56} />
              <small>Memuat Voucher SeaDeals..</small>
            </div>
          )
          : (
            <div className="text-start modal_select_body px-2">
              {vouchers.length === 0 && <p className="text-center text-secondary mt-3">Belum ada Voucher SeaDeals</p>}
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

export default SelectGlobalVoucher;
