import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/product';
import WalletMenu from './WalletMenu';

interface Props {
  balance: number,
  hasPin: boolean,
  mainSLPNum: string,
}

const AccountInfo:FC<Props> = ({ balance = 0, hasPin = false, mainSLPNum = '' }) => (
  <>
    <div className="p-3 rounded-top wallet-bg text-white text-start">
      <div className="d-flex justify-content-between">
        <div className="fw-bold">
          <small className="text-backdrop mb-3 fw-normal d-block">Balance</small>
          <span className="fs-6">Rp</span>
          <span className="fs-2 ms-2">{formatPrice(balance)}</span>
        </div>
        <div className="normal-link">
          <Link to={`${hasPin ? '/wallet/topup' : '/wallet/settings'}`}>
            <div className={`border border-2 rounded p-2 px-3 ${!hasPin && 'bg-gray-trans'}`}>
              <span className="mb-0 fw-bold fs-6">+ &nbsp; Top Up</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
    <div className="rounded-bottom border border-top-0 p-3 pt-4">
      {hasPin
        ? (
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="d-block">Main SeaLabsPay </small>
              {mainSLPNum
                ? (
                  <code className="fs-5 fw-bold text-dark">
                    {mainSLPNum}
                  </code>
                )
                : <p className="mt-1 fw-bold">No Saved SeaLabs Pay Account!</p>}
            </div>
            <WalletMenu />
          </div>
        )
        : <p className="text-secondary">Wallet PIN is not Set!</p>}
    </div>
  </>
);

export default AccountInfo;
