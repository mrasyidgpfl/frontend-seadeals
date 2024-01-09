import React, { FC } from 'react';
import formatCardNumber from '../../../utils/walletFormatter';

const WalletAccountItem:FC<any> = ({ account }) => (
  <div className="wallet_accounts_item p-4 border rounded d-flex justify-content-between">
    <p className="mb-0 text-dark fw-bold fs-6">{account?.name}</p>
    <code className="mb-0 text-dark fs-6">{formatCardNumber(account?.account_number)}</code>
  </div>
);

export default WalletAccountItem;
