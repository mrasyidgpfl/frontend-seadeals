import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  return async () => {
    try {
      await axiosPrivate.post('/sign-out', JSON.stringify({ user_id: parseInt(auth.user.user_id, 10) }));
      localStorage.removeItem('access_token');
    } catch (err) {
      console.error(err);
    }
    setAuth({});
  };
};

export default useLogout;
