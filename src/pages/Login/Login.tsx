import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import logo_xs from '../../assets/images/logo_xs.png';
import logo from '../../assets/images/logo.png';
import './Login.scss';
import Button from '../../components/Button/Button';

const LOGIN_URL = '/sign-in';

const Login = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async () => {
    try {
      toast.loading('Waiting for login');
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          withCredentials: true,
        },
      );
      const decode:any = jwt_decode(response.data.data.id_token);
      const accessToken = response?.data?.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      localStorage.setItem('access_token', accessToken);

      setEmail('');
      setPassword('');

      toast.dismiss();
      toast.success('loading successful');
      navigate(from, { replace: true });
    } catch (e:any) {
      toast.dismiss();
      toast.error(e?.response?.data?.message);
    }
  };

  const handleCallbackResponse = async (response: any) => {
    const loadingToast = toast.loading('Waiting for login');
    try {
      const res = await axios.post(
        '/google/sign-in',
        JSON.stringify({ token_id: response.credential }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const decode:any = jwt_decode(res.data.data.id_token);
      const accessToken = res?.data?.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      localStorage.setItem('access_token', accessToken);

      if (from === '/register' || from === '/login') {
        navigate('/', { replace: true });
      }

      navigate(from, { replace: true });
    } catch (err:any) {
      navigate('/register', { replace: true, state: err.response.data.data });
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline', size: 'large', shape: 'circle', width: '300',
      },
    );
  }, []);

  const [status, setStatus] = useState('');

  useEffect(() => {
    const token:any = localStorage.getItem('access_token');
    if (token !== null) {
      const dateNow = new Date();
      // @ts-ignore
      if (jwt_decode(token).exp * 1000 < dateNow.getTime()) {
        setStatus('expired');
        return;
      }
      setStatus('signed');
      return;
    }
    setStatus('unsigned');
  }, []);

  useEffect(() => {
    if (status === 'signed') {
      if (from === '/login' || from === '/register' || from === '/') {
        navigate('/', { replace: true });
      }
    }
  }, [status]);

  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(!revealed);
  };

  return (
    <div className="login_container">
      <div className="login_cards_container col-10 col-xl-8">
        <div className="register_cards row">
          <div className="logo-m d-block d-md-none col-12 col-md-6 py-2">
            <img alt="" className="img-fluid" src={logo_xs} />
          </div>
          <div className="logo center d-none d-md-block col-12 col-md-6 p-5">
            <img alt="" className="img-fluid" src={logo} />
          </div>
          <div className="center col-12 col-md-6 mx-auto">
            <div>
              <h1 className="header text-middle my-4">
                <b>
                  Masuk
                </b>
              </h1>
              <div className="d-flex justify-content-center row my-4">
                <form
                  className="col-md-10"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit().then();
                  }}
                >
                  <input
                    className="form__input p-2 mb-4"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                  />
                  <div className="input-group suffix mb-4">
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type={(revealed) ? 'text' : 'password'}
                      name="password"
                      id="password"
                      className="form__input p-2"
                      placeholder="Kata sandi"
                      required
                    />
                    <div className="input-group-addon" role="presentation" onClick={handleReveal}>
                      <span className="">
                        { !revealed ? <BsEyeSlash /> : <BsEye /> }
                      </span>
                    </div>
                  </div>
                  <div className="center">
                    <Button buttonType="primary w-100" isSubmit handleClickedButton={() => {}} text="Masuk" />
                  </div>
                </form>
                <div className="hr-sect my-4"><b>ATAU</b></div>
                <div className="d-flex justify-content-center">
                  <div className="mb-4" id="signInDiv" />
                </div>
                <div className="d-flex justify-content-center">
                  <p id="daftar-text">
                    Belum punya akun SeaDeals?
                    {' '}
                    <a href="/register" id="daftar-link"><b>Daftar</b></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
