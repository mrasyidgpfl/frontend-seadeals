import React, { FC } from 'react';
import formatTitle from '../../../utils/titleFormatter';
import formatDate from '../../../utils/dateFormatter';
import { formatPrice } from '../../../utils/product';
import Button from '../../../components/Button/Button';
import { parseTrxDesc } from '../../../utils/walletFormatter';

interface Props {
  trx: any,
  innerRef: any,
  setTrx: (trx:any) => void,
}

const WalletHistoryItem:FC<Props> = ({ trx, innerRef, setTrx }) => (
  <div ref={innerRef} className="border-top text-start py-3">
    <div className="d-flex justify-content-between">
      <div>
        <h6 className="mb-1">{formatTitle(trx?.payment_method)}</h6>
        <div>
          <small>
            {parseTrxDesc(trx)}
          </small>
        </div>
        <div>
          <small className="text-secondary">
            {formatDate(trx.created_at)}
          </small>
        </div>
      </div>
      <div className="d-flex flex-column text-end">
        <div>
          <span className={`px-1 ${trx.payment_type === 'CREDIT' ? 'text-success' : ''}`}>
            {trx.payment_type === 'CREDIT' ? '+' : '-'}
            Rp
            <b>
              {' '}
              {formatPrice(trx.amount)}
            </b>
          </span>
        </div>
        <div className="mt-auto normal-link ms-auto">
          <Button buttonType="plain" handleClickedButton={() => setTrx(trx)} text="view &#8250;" />
        </div>
      </div>
    </div>
  </div>
);

export default WalletHistoryItem;
