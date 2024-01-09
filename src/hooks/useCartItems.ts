import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

export default function useCartItems(limit:number) {
  const axiosPrivate = useAxiosPrivate();
  const [loadingCart, setLoadingCart] = useState(true);
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCartItems = async () => {
      try {
        const response = await axiosPrivate.get(`user/cart?limit=${limit}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setLoadingCart(false);
          setCart(data);
        }
      } catch (err) {
        setLoadingCart(false);
        setCart([]);
      }
    };
    getCartItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return {
    setLoadingCart, loadingCart, setCart, cart,
  };
}
