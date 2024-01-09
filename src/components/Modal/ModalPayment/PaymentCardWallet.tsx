import React, { FC } from 'react';
import sdIcon from '../../../assets/png/seadeals.png';
import { formatPrice } from '../../../utils/product';

interface PaymentWalletProps {
  balance: number,
  isBlocked: boolean,
  isDisabled: boolean,
  isActive: boolean,
  selectPayment: ()=>void
}

const PaymentCardWallet:FC<PaymentWalletProps> = (
  {
    balance, isBlocked, isDisabled, isActive, selectPayment = () => {},
  },
) => {
  const handleClick = () => {
    if (isDisabled) return;

    selectPayment();
  };

  return (
    <div
      className={`d-flex align-items-center gap-4 border rounded
          p-3 shadow-sm w-100 ${isActive && 'border-main'} ${isDisabled ? 'bg-lightgray' : 'hover-click'}`}
      role="presentation"
      onClick={handleClick}
    >
      <img src={sdIcon} alt="SeaDeals Wallet" height="40px" />
      <div>
        <p className="fw-bold fs-6">SeaDeals Wallet</p>
        { isBlocked
          ? <small className="text-accent">Wallet is currently Blocked.</small>
          : (
            <code className="text-dark fs-6">
              Rp
              {formatPrice(balance)}
            </code>
          )}
      </div>
    </div>
  );
};

export default PaymentCardWallet;
