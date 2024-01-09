import React, { FC } from 'react';
import formatTime from '../../../utils/dateFormatter';
import UserOrderReceiptDownload from './UserOrderReceiptDownload';
import { Receipt } from '../../../constants/orderItem';

interface Props {
  order: any,
  receipt: Receipt,
}

const UserOrderShipping:FC<Props> = ({ order, receipt }) => {
  const activityItems = order?.delivery?.activity?.reverse() || [];
  return (
    <div className="bg-white w-100 p-4 pb-3 mb-4 rounded shadow-sm">
      <div className="d-flex align-items-start justify-content-between mb-4">
        <div>
          <p className="fs-4 fw-bold">Alamat Pengiriman</p>
        </div>
        <div className="text-end text-secondary">
          <small className="d-block mb-0 fw-bold">{`${order?.delivery?.courier} - REG`}</small>
          <small>{order?.delivery?.delivery_number}</small>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-4 border-right">
          <p className="fw-bold mb-2">{order?.buyer_name}</p>
          <p className="text-secondary">{order?.delivery?.destination_address}</p>
        </div>
        <div className="col-8">
          {activityItems.map((activity:any, idx:number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={`row mb-3 ${idx === 0 ? 'text-dark' : 'text-secondary'}`} key={order.id + idx}>
              <div className="col-auto">
                <span className={`dot ${idx === 0 ? 'dot_first' : ''} mt-1`} />
              </div>
              <div className="col-3">
                <p>{formatTime(activity?.created_at)}</p>
              </div>
              <div className="col-8">
                <p>{activity?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <UserOrderReceiptDownload data={receipt} />
      </div>
    </div>
  );
};

export default UserOrderShipping;
