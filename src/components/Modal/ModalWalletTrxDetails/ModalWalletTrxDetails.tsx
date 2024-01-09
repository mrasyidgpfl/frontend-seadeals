import React, { FC } from 'react';
import Modal from '../Modal';
import WalletTrxDetails from '../../../pages/Wallet/TrxDetail/WalletTrxDetails';

interface ModalOrderDetailProps {
  show: boolean,
  setShow: (isShow:boolean)=>void,
  trx: any
}

const ModalWalletTrxDetails:FC<ModalOrderDetailProps> = ({ show, setShow, trx }) => {
  const children = () => (
    <div className="p-3 w-100 text-start">
      <WalletTrxDetails trx={trx} closeModal={() => setShow(false)} />
    </div>
  );

  return (
    <Modal
      isOpen={show}
      modalType="wallet-trx-detail"
      cancel={() => setShow(false)}
    >
      {children()}
    </Modal>
  );
};

export default ModalWalletTrxDetails;
