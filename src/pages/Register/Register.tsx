import './Register.scss';
import React, { useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';
import axios from '../../api/axios';
import logo from '../../assets/images/logo.png';
import logo_xs from '../../assets/images/logo_xs.png';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button/Button';

const Register = () => {
  const [revealed, setRevealed] = useState(false);
  const [confirmPasswordVis, setConfirmPasswordVis] = useState(false);

  const handleReveal = () => {
    setRevealed(!revealed);
  };

  const handleCPVis = () => {
    setConfirmPasswordVis(!confirmPasswordVis);
  };

  const uRL = '/register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('male');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const timeNow = `${new Date().toISOString().split('.')[0]}`;

  const [passwordCorrect, setPasswordCorrect] = useState(true);

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword !== '') {
      setPasswordCorrect(false);
      return;
    }
    setPasswordCorrect(true);
  }, [password, confirmPassword]);

  const [passwordValidity, setPasswordValidity] = useState(true);
  useEffect(() => {
    if (password.includes(userName) && userName !== '') {
      setPasswordValidity(false);
      return;
    }
    setPasswordValidity(true);
  }, [password, userName]);

  const [userNameValidity, setUserNameValidity] = useState(true);
  useEffect(() => {
    if (userName.includes(' ')) {
      setUserNameValidity(false);
      return;
    }
    setUserNameValidity(true);
  }, [userName]);

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const googleUser = location.state ? location.state.user : null;

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const loadingToast = toast.loading('Waiting for register');
    try {
      const response = await axios.post(
        uRL,
        JSON.stringify({
          email,
          password,
          username: userName,
          full_name: fullName,
          gender,
          phone: `+62${phone}`,
          birth_date: birthDate,
        }),
        {
          withCredentials: true,
        },
      );
      const decode:any = jwt_decode(response.data.data.data.id_token);
      const accessToken = response?.data?.data.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      localStorage.setItem('access_token', accessToken);

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUserName('');
      setFullName('');
      setGender('');
      setPhone('');
      setBirthDate('');

      navigate('/', { replace: true });
    } catch (err:any) {
      toast.error(err.response?.data?.message);
      navigate('/register', { replace: true });
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (googleUser) {
      setEmail(googleUser.email);
      setFullName(googleUser.name);
    }

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

  return (
    <div className="register_container">
      <div className="register_cards_container col-10 col-xl-8">
        <div className="register_cards row">
          <div className="logo-m d-block d-md-none col-12 col-md-6 py-2">
            <img alt="" className="img-fluid" src={logo_xs} />
          </div>
          <div className="logo d-none d-md-block col-12 col-md-6">
            <a href="/src/pages">
              <img alt="" className="register-logo-l img-fluid" src={logo} />
            </a>
          </div>
          <div className="col-12 col-md-6 mx-auto my-2">
            <div className="my-3">
              <h1 className="header mb-2">
                <b>
                  Daftar
                </b>
              </h1>
              <div className="justify-content-center">
                <form
                  className="col-12"
                  onSubmit={(e) => {
                    handleSubmit(e).then();
                  }}
                >
                  <input
                    className="form__input p-2 mb-2"
                    value={email}
                    onChange={(event: { target: { value: React.SetStateAction<string>; };
                    }) => setEmail(event.target.value)}
                    type="email"
                    id="email-m"
                    placeholder="Email"
                    autoComplete="new-password"
                    required
                  />
                  <div className="mb-2">
                    <div className="input-group suffix">
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={(revealed) ? 'text' : 'password'}
                        name="password-m"
                        id="password-m"
                        className={passwordValidity ? 'form__input p-2' : 'form__input p-2 is-invalid'}
                        placeholder="Kata sandi"
                        autoComplete="new-password"
                        required
                      />
                      {/* eslint-disable-next-line max-len */}
                      <div className="input-group-addon" role="presentation" onClick={handleReveal}>
                        <span className="">
                          { !revealed ? <BsEyeSlash className="password-vis-button" /> : <BsEye className="password-vis-button" /> }
                        </span>
                      </div>
                    </div>
                    {
                      passwordValidity ? '' : (
                        <div id="invalid-password" className="text-accent">
                          Password should not include username!
                        </div>
                      )
                    }
                  </div>
                  <div className="mb-2">
                    <div className="input-group suffix">
                      <input
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        type={(confirmPasswordVis) ? 'text' : 'password'}
                        name="confirm-password-m"
                        id="confirm-password-m"
                        className={passwordCorrect ? 'form__input p-2' : 'form__input p-2 is-invalid'}
                        placeholder="Ulang kata sandi"
                        autoComplete="new-password"
                        required
                      />
                      {/* eslint-disable-next-line max-len */}
                      <div className="input-group-addon" role="presentation" onClick={handleCPVis}>
                        <span className="">
                          { !confirmPasswordVis ? <BsEyeSlash className="password-vis-button" /> : <BsEye className="password-vis-button" /> }
                        </span>
                      </div>
                    </div>
                    {
                      passwordCorrect ? '' : (
                        <div id="invalid-password" className="text-accent">
                          Passwords are not the same!
                        </div>
                      )
                    }
                  </div>
                  <div className="mb-2">
                    <input
                      className={userNameValidity ? 'form__input p-2 mb-2' : 'form__input p-2 is-invalid mb-2'}
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                      type="text"
                      id="username-m"
                      placeholder="Username"
                      autoComplete="new-password"
                      required
                    />
                    {
                      userNameValidity ? '' : (
                        <div id="invalid-username" className="invalid-feedback">
                          Whitespaces aren&apos;t allowed in usernames!
                        </div>
                      )
                    }
                  </div>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="form__input p-2 mb-2"
                    type="text"
                    id="fullName-m"
                    placeholder="Nama lengkap"
                    autoComplete="new-password"
                    required
                  />
                  <select
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    className="form-select mb-2"
                    aria-label="Jenis kelamin"
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                  <div className="input-group prefix">
                    <div className="input-group-addon">
                      <span className="" id="inputGroupPrepend">+62</span>
                    </div>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      type="tel"
                      className="form__input p-2"
                      id="validationCustomTelephone-m"
                      placeholder="Nomor ponsel"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                  </div>
                  <label className="birth-date mt-2">Tanggal lahir: </label>
                  <input
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    max={timeNow.toString().substring(0, 10)}
                    className="form__input p-2 mb-2"
                    type="date"
                    id="birthDate-m"
                    required
                  />
                  <div>
                    <Button buttonType="primary w-100" handleClickedButton={() => {}} isSubmit text="Daftar" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
