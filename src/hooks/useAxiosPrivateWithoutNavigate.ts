import { useEffect } from 'react';
import useAuth from './useAuth';
import { axiosPrivate } from '../api/axios';

const useAxiosPrivateWithoutNavigate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use((config) => {
      if (!config?.headers?.Authorization) {
        const accessToken = localStorage.getItem('access_token');
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    }, (error) => Promise.reject(error));

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => Promise.reject(error),
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivateWithoutNavigate;
