import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    const response:any = await axios.get('/refresh/access-token', {
      withCredentials: true,
    }).catch((e) => {
      if (e.status === 401) {
        navigate('/login');
      }
    });
    const decode:any = jwt_decode(response.data.data.id_token);
    const accessToken = response.data.data.id_token;
    const { user, scope } = decode;

    setAuth({ user, roles: scope.split(' '), accessToken });
    localStorage.setItem('access_token', accessToken);

    setAuth((prev:any) => ({ ...prev, accessToken }));

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
