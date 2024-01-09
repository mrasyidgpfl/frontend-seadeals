import React, { FC } from 'react';
import { formatPrice } from '../../utils/product';
import formatTitle from '../../utils/titleFormatter';
import formatDate from '../../utils/dateFormatter';
import { parseTrxDesc } from '../../utils/walletFormatter';

const WalletTrxItem: FC<any> = ({ trxItem }) => (
  <div className="text-start border-top px-0">
    <div className="d-flex justify-content-between align-items-center px-4 py-3">
      <div>
        <p className="mb-0">{formatTitle(trxItem?.payment_method)}</p>
        <small className="d-block">{parseTrxDesc(trxItem)}</small>
        <small className="text-secondary d-block">{formatDate(trxItem?.created_at)}</small>
      </div>
      <div>
        <p className={`mb-0 ${trxItem?.payment_type === 'CREDIT' ? 'text-success' : ''}`}>
          {trxItem?.payment_type === 'CREDIT' ? '+' : '-'}
          Rp
          <b>
            {' '}
            {formatPrice(trxItem?.amount || 0)}
          </b>
        </p>
      </div>
    </div>
  </div>
);

export default WalletTrxItem;
