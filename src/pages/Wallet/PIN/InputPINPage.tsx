import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputPINField from './InputPINField';
import WalletPINButton from './WalletPINButton';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const InputPINPage = () => {
  const [PIN, setPIN] = useState<string[]>(new Array(6).fill(''));
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const PINValue = PIN.join('');
    // set toast pin incomplete
    if (PINValue.length !== 6) return;
    // set loading
    try {
      // set toast loading
      const response = await axiosPrivate.patch('wallet-pin', JSON.stringify({ pin: PINValue }));
      if (response.status === 200 || response.status === 201) {
        // set toast success changed pin
        navigate('/wallet');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <p className="text-secondary mb-2">Atur PIN baru untuk mengamankan wallet Anda.</p>
      <div className="set-pin-box py-3">
        <InputPINField PIN={PIN} setPIN={setPIN} />
      </div>
      <div className="pb-3 mx-auto">
        <WalletPINButton
          title="Set PIN"
          handleClick={() => handleSubmit()}
          widthType="auto"
        />
      </div>
    </>
  );
};

export default InputPINPage;
