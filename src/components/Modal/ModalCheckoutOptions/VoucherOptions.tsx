import React, { FC } from 'react';
import formatTitle from '../../../utils/titleFormatter';
import formatTime from '../../../utils/dateFormatter';
import { formatPrice } from '../../../utils/product';

interface VoucherOptionsProps {
  isSelected: boolean,
  setOption: ()=>void,
  voucher: any,
  total: number
}

const VoucherOptions:FC<VoucherOptionsProps> = ({
  isSelected, setOption, voucher, total,
}) => {
  const isVoucherDisabled = total < voucher.min_spending;

  const handleClick = () => {
    if (isVoucherDisabled) return;
    setOption();
  };

  return (
    <div
      className={`w-100 ${isSelected && 'border-main'} border rounded hover-click mb-3 ${isVoucherDisabled && 'bg-disabled'}`}
      role="presentation"
      onClick={() => handleClick()}
    >
      <div className="p-3">
        <h2 className="fw-bold mb-2">{formatTitle(voucher.name)}</h2>
        <div className="d-flex justify-content-between">
          <code className="fs-5 text-success">{voucher.code}</code>
          <small>{`Minimal pembelian Rp ${formatPrice(voucher.min_spending || 0)}`}</small>
        </div>
      </div>
      <div className="d-flex justify-content-between border-top-dashed p-3 pb-2">
        <div className="text-secondary">
          <small className="d-block">{`Berlaku ${formatTime(voucher.start_date)}`}</small>
          <small>{`Hingga ${formatTime(voucher.end_date)}`}</small>
        </div>
        <div>
          <h2 className="fw-bold">
            {voucher.amount_type === 'percentage' ? `${voucher.amount}%` : `Rp${formatPrice(voucher.amount)}`}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VoucherOptions;
