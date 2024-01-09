import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import formatTitle from '../../utils/titleFormatter';
import { formatPrice } from '../../utils/product';
import successIcon from '../../assets/svg/success.svg';
import failIcon from '../../assets/svg/fail.svg';

const PostTopupSLP = () => {
  const [searchParam] = useSearchParams();
  const [seconds, setSeconds] = useState(3);
  const [subMsg, setSubMsg] = useState('');
  const [icon, setIcon] = useState('');

  const redirectToWallet = () => {
    // @ts-ignore
    window.top.location.href = '/wallet';
  };

  const initializePage = (status:string | null) => {
    switch (status) {
      case 'TXN_FAILED':
        setIcon(failIcon);
        setSubMsg('Top Up with SeaLabs Pay Failed');
        return;
      case 'TXN_PAID':
        setIcon(successIcon);
        setSubMsg('Top Up Successfully Paid with SeaLabs Pay');
        return;
      default:
        setSubMsg('');
    }
  };

  useEffect(() => {
    const status = searchParam.get('status');
    initializePage(status);

    const timerId = setInterval(() => setSeconds((prevState) => prevState - 1), 1000);
    setTimeout(() => { clearInterval(timerId); redirectToWallet(); }, 3500);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="p-4 text-center d-flex justify-content-between flex-column">
        <div className="mb-5">
          <div className="mb-3">
            <img alt="success" src={icon} height={156} />
          </div>
          <p className="fs-2 fw-bold mb-3">{formatTitle(searchParam.get('message'))}</p>
          <p className="mb-4">{subMsg}</p>
          <p className="fs-5 mb-2">Amount</p>
          <p className="fs-4 fw-bold">
            Rp
            {formatPrice(parseInt(searchParam.get('amount') || '', 10))}
          </p>
        </div>
        <small className="mb-2">{`Redirecting in ${seconds}..`}</small>
        <button
          type="button"
          className="p-2 rounded bg-main text-white fw-bold"
          onClick={redirectToWallet}
        >
          Back to Wallet
        </button>
      </div>
    </div>

  );
};

export default PostTopupSLP;
