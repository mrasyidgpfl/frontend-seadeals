import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import isJWTExpired from '../utils/jwtExpiryChecker';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    //  harusnya: bukan pas access_tokennya yg null,
    //  tapi pas access null && refresh_tokennya expire/non exist
    const accessToken:any = localStorage.getItem('access_token');
    if (!accessToken) {
      // navigate('/login');
      setAuth({});
      setIsLoading(false);
    }

    const createUserFromToken = async () => {
      try {
        const decode:any = jwt_decode(accessToken);
        if (isJWTExpired(decode)) {
          await refresh();
          setIsLoading(false);
        }

        const { user, scope } = decode;

        await setAuth({ user, roles: scope.split(' '), accessToken });
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    if (!auth?.accessToken) { // if no user state found, create one from token
      createUserFromToken();
    }
    setIsLoading(false);

    return () => { isMounted = false; };
  }, []);

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading
        ? <p>Loading..</p>
        : <Outlet />}
    </>
  );
};

export default PersistLogin;
