import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from './useAxiosPrivate';

export default function useWalletStatus() {
  const axiosPrivate = useAxiosPrivate();
  const [loadingIsBlocked, setLoadingIsBlocked] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getWalletInfo = async () => {
      try {
        const response = await axiosPrivate.get('user/wallet/status', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          if (data.status === 'blocked') setIsBlocked(true);
          setLoadingIsBlocked(false);
        }
      } catch (err) {
        toast.error('Failed to Fetch User Wallet Info');
      }
    };
    getWalletInfo();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { loadingIsBlocked, isBlocked };
}
