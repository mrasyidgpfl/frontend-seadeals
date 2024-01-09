import React, { FC, useState } from 'react';
import WalletAccountItem from './WalletAccountItem';
import Button from '../../../components/Button/Button';

const WalletAccounts:FC<any> = ({ accounts }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="wallet_accounts">
      <div className="mx-auto my-4 rounded bg-white shadow-sm rounded">
        <div className="px-4 py-3 border-bottom">
          <div className="d-flex justify-content-between">
            <h5 className="mb-0 fw-bold">Akun SeaLabsPay</h5>
            <Button
              text={`${showAll ? 'Sembunyikan' : 'Lihat Semua'}`}
              buttonType="plain text-main"
              handleClickedButton={() => { setShowAll((prevState) => !prevState); }}
            />
          </div>
        </div>
        <div className={`px-2 py-3 ${!showAll && 'wallet_accounts_close'}`}>
          {accounts?.length > 0
            ? accounts.map((account:any, idx:number) => {
              if (!showAll && idx > 0) return '';
              return <WalletAccountItem key={account.id} account={account} />;
            })
            : (
              <div>
                <p className="text-center mb-0 fs-6 text-secondary py-3 mb-0">No Saved SeaLabsPay Account!</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default WalletAccounts;
