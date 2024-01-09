import React, { FC } from 'react';
import InputPINPage from './InputPINPage';
import AuthValidation from './AuthValidation';

const ChangePINPage:FC<any> = ({ authPass, setAuthPass }) => (
  <div className="px-4 py-3 w-content text-center mb-5">
    <h5 className="mb-2 px-1">Wallet PIN</h5>
    {authPass
      ? <InputPINPage />
      : <AuthValidation setAuthPass={setAuthPass} />}
  </div>
);

export default ChangePINPage;
