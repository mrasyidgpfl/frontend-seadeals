import React, { FC, useEffect, useState } from 'react';
import PaymentCardWallet from './PaymentCardWallet';
import PAYMENT_TYPE from '../../../constants/payment';
import PaymentCardSLP from './PaymentCardSLP';
import useWalletBalance from '../../../hooks/useWalletBalance';
import useWalletStatus from '../../../hooks/useWalletStatus';
import LoadingPlain from '../../Loading/LoadingPlain';

interface PaymentCardsProps {
  total: number,
  selectedMethod: string,
  setSelectedMethod: any,
}

const PaymentCards:FC<PaymentCardsProps> = ({ total, selectedMethod, setSelectedMethod }) => {
  const { loadingBalance, balance } = useWalletBalance();
  const { loadingIsBlocked, isBlocked } = useWalletStatus();
  const [isWalletDisabled, setIsWalletDisabled] = useState(false);

  const checkWalletDisabled = () => balance < total || isBlocked;

  useEffect(() => {
    setIsWalletDisabled(checkWalletDisabled());
    if (!checkWalletDisabled() && !loadingBalance && !loadingIsBlocked) {
      setSelectedMethod(PAYMENT_TYPE.WALLET);
    }
  }, [balance, isBlocked]);

  return (
    <div className="p-3 pt-0 px-4 d-flex gap-3 align-items-center">
      {loadingBalance || loadingIsBlocked
        ? (
          <div className="text-center w-100 border rounded p-3">
            <LoadingPlain height={38} />
            <small>Memuat Metode Pembayaran</small>
          </div>
        )
        : (
          <>
            <PaymentCardWallet
              balance={balance}
              isBlocked={isBlocked}
              isDisabled={isWalletDisabled}
              isActive={selectedMethod === PAYMENT_TYPE.WALLET}
              selectPayment={() => setSelectedMethod(PAYMENT_TYPE.WALLET)}
            />
            <PaymentCardSLP
              isActive={selectedMethod === PAYMENT_TYPE.SLP}
              selectPayment={() => setSelectedMethod(PAYMENT_TYPE.SLP)}
            />
          </>
        )}
    </div>
  );
};

export default PaymentCards;
