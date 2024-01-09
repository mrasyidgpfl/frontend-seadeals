import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import WalletTrxDetailsRows from './WalletTrxDetailsRows';
import { formatPrice } from '../../../utils/product';
import formatTime from '../../../utils/dateFormatter';
import formatTitle from '../../../utils/titleFormatter';

interface Props {
  trx: any,
  closeModal: ()=>void,
}

const WalletTrxDetails:FC<Props> = ({ trx, closeModal }) => (
  <div className="p-4 pt-0">
    <div className="pt-4 pb-2 d-flex justify-content-between">
      <h4 className="fw-bold">Detail Transaksi</h4>
      <span
        role="presentation"
        className="fs-4 px-2 hover-click fw-bold text-secondary"
        onClick={() => closeModal()}
      >
        &#215;
      </span>
    </div>
    <div className="border-bottom-dashed">
      <div className="pt-3 pb-4">
        <p className={`mb-3 fs-1 fw-bold ${trx.payment_type === 'CREDIT' ? 'text-success' : ''}`}>
          {`${trx.payment_type === 'CREDIT' ? '+' : ''} Rp ${formatPrice(trx?.amount)}`}
        </p>
        <p className="mb-1 fs-5">{trx?.description}</p>
      </div>
    </div>
    <div className="border-bottom text-start">
      <div className="py-3">
        {trx.transaction_id && (
        <div className="pb-3 d-flex justify-content-between">
          <p className="mb-0 fs-5 fw-bold">{`Transaction ID: ${trx.transaction_id}`}</p>
          <Link to="/user/order-history">
            <small>Lihat Pesanan</small>
          </Link>
        </div>
        )}
        <WalletTrxDetailsRows column="Payment Method" value={formatTitle(trx?.payment_method)} />
        <WalletTrxDetailsRows column="Date" value={formatTime(trx?.created_at)} />
      </div>
    </div>
  </div>
);

export default WalletTrxDetails;
