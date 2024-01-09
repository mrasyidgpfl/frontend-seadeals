import React, { useEffect, useState } from 'react';
import './Wallet.scss';
import PINHeader from './PIN/PINHeader';
import isWalletPINSet from '../../utils/isWalletPINSet';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ChangePINPage from './PIN/ChangePINPage';
import Loading from '../../components/Loading/Loading';

const WalletPIN = () => {
  const [authPass, setAuthPass] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getWalletInfo = async () => {
      try {
        const response = await axiosPrivate.get('user-wallet', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setAuthPass(!isWalletPINSet(data.status));
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getWalletInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="mini-w-screen mx-auto">
      <div className="mini-w-content my-4 rounded bg-white shadow-sm rounded py-3">
        <PINHeader />
        {loading
          ? <Loading height={76} />
          : <ChangePINPage authPass={authPass} setAuthPass={setAuthPass} />}
      </div>
    </div>
  );
};
export default WalletPIN;
