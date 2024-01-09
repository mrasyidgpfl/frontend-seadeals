import React, { FC, useRef, useState } from 'react';
import formatCardNumber from '../../../utils/walletFormatter';
import Button from '../../Button/Button';

interface SelectSLPProps {
  selectedID: number,
  SLPAccounts: any[],
  selectSLP: (id:number)=>void
}

const SelectSLP:FC<SelectSLPProps> = ({ selectedID, SLPAccounts, selectSLP }) => {
  const [collapse, setCollapse] = useState(true);
  const topSLP = useRef<any>();

  const handleSelect = (id:number) => {
    setCollapse((prevState) => !prevState);
    selectSLP(id);
    topSLP.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-75 mx-auto mb-5">
      <div className={`${collapse ? 'slp_list_close' : 'slp_list_open'} mb-2 border`}>
        {
            SLPAccounts.length > 0
              ? SLPAccounts.map((account:any, idx:number) => (
                <div
                  key={account.id}
                  ref={idx === 0 ? topSLP : null}
                  className={`mb-2 p-2 rounded hover-click ${selectedID === account.id && 'border slp_item_selected'}`}
                  role="presentation"
                  onClick={() => handleSelect(account.id)}
                >
                  <p className="fs-5 fw-bold">{account.name}</p>
                  <code className="text-dark">{formatCardNumber(account.account_number)}</code>
                </div>
              ))
              : (
                <div className="h-100 d-flex align-items-center">
                  <p className="text-secondary text-center mx-auto">Tidak ditemukan Akun SeaLabs Pay!</p>
                </div>
              )
        }
      </div>
      <Button
        buttonType="plain float-end"
        handleClickedButton={() => setCollapse((prevState) => !prevState)}
        text="Pilih akun lain"
      />
    </div>
  );
};

export default SelectSLP;
