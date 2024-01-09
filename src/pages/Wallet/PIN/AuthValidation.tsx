import React, { FC, useState } from 'react';
import CHANGE_PIN from '../../../constants/changePINActions';
import EmailValidation from './ValidationMethods/EmailValidation';
import PasswordValidation from './ValidationMethods/PasswordValidation';
import SelectValidation from './ValidationMethods/SelectValidation';

const AuthValidation:FC<any> = ({ setAuthPass }) => {
  const [method, setMethod] = useState('');

  switch (method) {
    case CHANGE_PIN.WITH_PW:
      return <PasswordValidation setMethod={setMethod} setAuthPass={setAuthPass} />;
    case CHANGE_PIN.WITH_EMAIL:
      return <EmailValidation setMethod={setMethod} setAuthPass={setAuthPass} />;
    default:
      return <SelectValidation setMethod={setMethod} />;
  }
};

export default AuthValidation;
