import React, { useState } from 'react';
import InputPINField from '../Wallet/PIN/InputPINField';
import Button from '../../components/Button/Button';

const CheckoutPayment = () => {
  const [PIN, setPIN] = useState<string[]>(new Array(6).fill(''));

  return (
    <div className="container">
      <div className="w-75 mx-auto">
        <div className="w-50 mx-auto mt-5">
          <div className="border rounded p-2 d-flex justify-content-between mb-3">
            <p>
              Mock Pay with
              SeaLabsPay
            </p>
            <button type="button">Select</button>
          </div>
          <div className="border rounded p-2 d-flex justify-content-between mb-3">
            <p>Mock Pay with Wallet</p>
            <button type="button">Select</button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center d-flex justify-content-between flex-column mini-w-screen border rounded">
          <div className="text-center border-bottom py-2 px-2">
            <p className="fs-5 fw-bold">Bayar dengan Wallet</p>
          </div>
          <div className="set-pin-box py-3">
            <p className="mb-3">Masukkan 6 digit PIN Wallet Anda</p>
            <InputPINField PIN={PIN} setPIN={setPIN} />
            <a href="/wallet/settings"><p className="mt-1 mb-3">Lupa PIN?</p></a>
          </div>
          <div className="pb-3 w-50 mx-auto">
            <Button text="Bayar" buttonType="primary mx-auto w-75" handleClickedButton={() => console.log()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
