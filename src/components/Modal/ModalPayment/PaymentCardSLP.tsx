import React, { FC } from 'react';
import slpIcon from '../../../assets/svg/slp.svg';

interface PaymentSLPProps {
  isActive: boolean,
  selectPayment: ()=>void
}

const PaymentCardSLP:FC<PaymentSLPProps> = ({ isActive, selectPayment = () => {} }) => (
  <div
    className={`d-flex align-items-center gap-4 border rounded p-3 shadow-sm hover-click w-100 ${isActive && 'border-main'}`}
    role="presentation"
    onClick={selectPayment}
  >
    <img src={slpIcon} alt="SeaLabs Pay" height="40px" />
    <div>
      <p className="fw-bold fs-6">SeaLabs Pay</p>
      <code className="text-dark fs-6">Select Account</code>
    </div>
  </div>
);

export default PaymentCardSLP;
