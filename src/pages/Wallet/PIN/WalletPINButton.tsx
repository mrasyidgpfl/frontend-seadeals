import React, { FC } from 'react';
import lock from '../../../assets/svg/lock.svg';

const WalletPINButton:FC<any> = ({
  title, handleClick, widthType = 'fixed', icon = lock,
}) => (
  <button
    type="button"
    className={`btn border rounded px-4 ${widthType === 'auto' ? 'w-auto' : 'w-50'}`}
    onClick={handleClick}
  >
    <div className="d-flex align-items-center gap-2">
      <img alt="PIN" src={icon} />
      <span className="mx-auto">{title}</span>
    </div>
  </button>
);

export default WalletPINButton;
