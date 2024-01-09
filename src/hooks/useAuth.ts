import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => useContext<any>(AuthContext);

export default useAuth;
