import React, { useState } from 'react';
import PAYMENT_TYPE from '../../../constants/payment';
import { formatPrice } from '../../../utils/product';
import Modal from '../Modal';
import WalletIframe from '../../../pages/Wallet/Iframe/checkout/WalletIframe';
import PayWithSLP from './PayWithSLP';
import './ModalPayment.scss';
import PaymentCards from './PaymentCards';

type ModalPaymentProps = {
  orderItems: any[],
  handleCloseModal: () => void,
  total: number,
  address: any,
  isOpen: boolean,
  globalVoucher: any,
};

const ModalPayment = (props: ModalPaymentProps) => {
  const {
    orderItems,
    handleCloseModal,
    total,
    address,
    isOpen,
    globalVoucher,
  } = props;

  const [open, setOpen] = useState(isOpen);
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleClose = () => {
    setOpen(!open);
  };

  const renderPaymentMethod = () => {
    switch (selectedMethod) {
      case PAYMENT_TYPE.SLP:
        return (
          <PayWithSLP
            orderItems={orderItems}
            closeModal={handleClose}
            address={address}
            globalVoucher={globalVoucher}
          />
        );
      case PAYMENT_TYPE.WALLET:
        return (
          <WalletIframe
            orderItems={orderItems}
            closeModal={handleClose}
            address={address}
            globalVoucher={globalVoucher}
          />
        );
      default:
        return (
          <div className="h-100 d-flex align-items-center">
            <p className="mx-auto fs-5 text-secondary">Select a Payment Method</p>
          </div>
        );
    }
  };

  const children = () => (
    <div className="w-100 p-4 payment_modal_window">
      <div className="d-flex justify-content-between p-3 px-4 border-bottom-dashed">
        <p className="fw-bold fs-5">Total Pembayaran</p>
        <p className="text-accent fw-bold fs-5">
          Rp
          {formatPrice(total)}
        </p>
      </div>
      <p className="p-3 px-4">Pilih Metode Pembayaran</p>
      <PaymentCards
        total={total}
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />
      <div className="px-4">
        <div className="border rounded payment_iframe_window">
          {renderPaymentMethod()}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      modalType="payment"
      cancel={handleCloseModal}
      isOpen={open}
    >
      {children()}
    </Modal>
  );
};

export default ModalPayment;
