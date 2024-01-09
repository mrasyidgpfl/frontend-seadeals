import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from './useAxiosPrivate';

export default function useSellerDeliveryOptions(sellerID:number) {
  const axiosPrivate = useAxiosPrivate();
  const [loadingCouriers, setLoadingCouriers] = useState(true);
  const [couriers, setCouriers] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSellerCouriers = async () => {
      try {
        const response = await axiosPrivate.get(`sellers/${sellerID}/couriers`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setLoadingCouriers(false);
          setCouriers(data);
        }
      } catch (err) {
        toast.error('Gagal Memuat Jasa Kurir Toko');
      }
    };
    getSellerCouriers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { loadingCouriers, couriers };
}
