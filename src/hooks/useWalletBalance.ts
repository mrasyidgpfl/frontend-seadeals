import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from './useAxiosPrivate';

export default function useWalletBalance() {
  const axiosPrivate = useAxiosPrivate();
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [balance, setBalance] = useState(0);

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
          setLoadingBalance(false);
          setBalance(data.balance);
        }
      } catch (err) {
        toast.error('Failed to Fetch Wallet Balance');
      }
    };
    getWalletInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { loadingBalance, balance };
}
