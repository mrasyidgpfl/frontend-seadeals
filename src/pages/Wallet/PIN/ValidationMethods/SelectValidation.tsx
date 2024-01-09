import React, { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import mailIcon from '../../../../assets/svg/icon_mail_2.svg';
import pwIcon from '../../../../assets/svg/icon_pw.svg';
import CHANGE_PIN from '../../../../constants/changePINActions';
import WalletPINButton from '../WalletPINButton';
import useWalletStatus from '../../../../hooks/useWalletStatus';

const SelectValidation:FC<any> = ({ setMethod }) => {
  const navigate = useNavigate();
  const { loadingIsBlocked, isBlocked } = useWalletStatus();

  useEffect(() => {
    if (!loadingIsBlocked && isBlocked) {
      toast.error('Wallet is Currently Blocked.');
      navigate('/wallet');
    }
  });

  return (
    <>
      <p>Pilih opsi atur ulang PIN wallet</p>
      <div className="py-3">
        <WalletPINButton
          title="Change PIN with Password"
          icon={pwIcon}
          handleClick={() => setMethod(CHANGE_PIN.WITH_PW)}
        />
      </div>
      <div>
        <WalletPINButton
          title="Change PIN with Email"
          icon={mailIcon}
          handleClick={() => setMethod(CHANGE_PIN.WITH_EMAIL)}
        />
      </div>
    </>
  );
};

export default SelectValidation;
