import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from './useAxiosPrivate';

export default function useGlobalVouchers() {
  const axiosPrivate = useAxiosPrivate();
  const [loadingVouchers, setLoadingVouchers] = useState(true);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getGlobalVouchers = async () => {
      try {
        const response = await axiosPrivate.get('global-vouchers', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setLoadingVouchers(false);
          setVouchers(data);
        }
      } catch (err) {
        toast.error('Gagal Memuat Voucher SeaDeals');
      }
    };
    getGlobalVouchers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { loadingVouchers, vouchers };
}
