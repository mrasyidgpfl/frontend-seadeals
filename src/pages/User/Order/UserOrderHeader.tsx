import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  trxID: number
}

const UserOrderHeader:FC<Props> = ({ trxID }) => (
  <div className="bg-white w-100 p-4 mb-4 rounded shadow-sm mb-4 normal-link d-flex justify-content-between align-items-center">
    <Link to="/user/order-history">
      <div className="d-flex gap-2 align-items-center fw-bold">
        <span className="fs-4">&#8249;</span>
        <p className="mt-1">Kembali ke Pesanan</p>
      </div>
    </Link>
    <small>{`No. Transaksi ${trxID}`}</small>
  </div>
);

export default UserOrderHeader;
