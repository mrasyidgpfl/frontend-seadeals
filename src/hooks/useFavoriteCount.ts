import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';

export default function useFavoriteCount(dependencies:any) {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [loadingFavorite, setLoadingFavorite] = useState(true);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    setLoadingFavorite(true);
    setFavoriteCount(0);
    let isMounted = true;
    const controller = new AbortController();
    const getFavoriteCount = async () => {
      try {
        const response = await axiosPrivate.get('/user/favorite-counts', {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setLoadingFavorite(false);
          setFavoriteCount(data.favorite_count);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (auth?.accessToken) {
      getFavoriteCount();
    } else {
      setLoadingFavorite(false);
      setFavoriteCount(0);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [dependencies]);

  return { loadingFavorite, favoriteCount };
}
