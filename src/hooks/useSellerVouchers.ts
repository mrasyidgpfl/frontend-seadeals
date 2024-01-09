import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from './useAxiosPrivate';

export default function useSellerVouchers(sellerID:number) {
  const axiosPrivate = useAxiosPrivate();
  const [loadingVouchers, setLoadingVouchers] = useState(true);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSellerVouchers = async () => {
      try {
        const response = await axiosPrivate.get(`sellers/${sellerID}/vouchers`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setLoadingVouchers(false);
          setVouchers(data);
        }
      } catch (err) {
        toast.error('Gagal Memuat Voucher Toko');
      }
    };
    getSellerVouchers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { loadingVouchers, vouchers };
}
