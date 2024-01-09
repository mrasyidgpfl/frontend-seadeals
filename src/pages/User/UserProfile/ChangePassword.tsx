import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Button from '../../../components/Button/Button';
import Users from '../../../api/users';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import useLogout from '../../../hooks/useLogout';

const ChangePassword:FC<any> = ({ handleClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const { auth } = useAuth();
  const username = auth.user.username.toLowerCase();
  const { email } = auth.user;
  const [password, setPassword] = useState({
    new_password: '',
    repeat_new_password: '',
    current_password: '',
  });
  const [invalidMsg, setInvalidMsg] = useState({
    new_password: '',
    repeat_new_password: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const handleChange = (e:any) => {
    if (e.target.name === 'repeat_new_password') {
      if (e.target.value !== password.new_password) {
        setInvalidMsg({ ...invalidMsg, repeat_new_password: 'password doesn\'t match' });
      } else {
        setInvalidMsg({ ...invalidMsg, repeat_new_password: '' });
      }
    } else if (e.target.name === 'new_password') {
      if (e.target.value.toLowerCase().includes(username)) {
        setInvalidMsg({ ...invalidMsg, new_password: 'password must not contain username' });
      } else if (e.target.value.toLowerCase().includes('admin123') || e.target.value.toLowerCase().includes('11admin11')) {
        setInvalidMsg({ ...invalidMsg, new_password: `password must not be ${e.target.value}` });
      } else {
        setInvalidMsg({ ...invalidMsg, new_password: '' });
      }
    }
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const loadingToast = toast.loading('Please wait a second...');
    const body = {
      ...password,
      email,
    };
    await Users.ChangePassword(axiosPrivate, body)
      .then(() => {
        toast.success('Password berhasil diubah');
        handleClose();
        logout();
      })
      .catch((err: any) => {
        toast.error(err.response?.data?.message);
      }).finally(() => {
        toast.dismiss(loadingToast);
      });
  };

  return (
    <div className="">
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          if (invalidMsg.new_password === '' && invalidMsg.repeat_new_password === '') {
            handleSubmit().then();
          }
        }}
      >
        <h3 className="change-password__title"><b>Ganti Password</b></h3>
        <div className="my-4 input-container medium">
          <p className="caption-input">Password Saat Ini</p>
          <div className="input-group suffix">
            <input
              type={!showCurrentPassword ? 'password' : 'text'}
              placeholder="Masukkan password"
              onChange={handleChange}
              name="current_password"
              className="form__input p-2"
              required
            />
            <div className="input-group-addon" role="presentation" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
              <span className="">
                { !showCurrentPassword ? <BsEyeSlash /> : <BsEye /> }
              </span>
            </div>
          </div>
        </div>
        <div className="my-4 input-container medium">
          <p className="caption-input">Password Baru</p>
          <div className="input-group suffix">
            <input
              type={!showNewPassword ? 'password' : 'text'}
              placeholder="Masukkan password"
              onChange={handleChange}
              name="new_password"
              className="form__input p-2"
              required
            />
            <div className="input-group-addon" role="presentation" onClick={() => setShowNewPassword(!showNewPassword)}>
              <span className="">
                { !showNewPassword ? <BsEyeSlash /> : <BsEye /> }
              </span>
            </div>
          </div>
          {invalidMsg.new_password !== '' && <p className="invalid-input">{invalidMsg.new_password}</p>}
        </div>
        <div className="my-4 input-container medium">
          <p className="caption-input">Ulangi Password Baru</p>
          <div className="input-group suffix">
            <input
              type={!showRepeatPassword ? 'password' : 'text'}
              placeholder="Masukkan password"
              onChange={handleChange}
              name="repeat_new_password"
              className="form__input p-2"
              required
            />
            <div className="input-group-addon" role="presentation" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
              <span className="">
                { !showRepeatPassword ? <BsEyeSlash /> : <BsEye /> }
              </span>
            </div>
          </div>
          {invalidMsg.repeat_new_password !== '' && <p className="invalid-input">{invalidMsg.repeat_new_password}</p>}
        </div>
        <div className="d-flex justify-content-end mt-4 gap-3">
          <Button buttonType="secondary alt" handleClickedButton={() => handleClose()} text="Batal" />
          <Button buttonType="primary" handleClickedButton={() => {}} text="Submit" isSubmit isDisabled={(invalidMsg.new_password !== '' || invalidMsg.repeat_new_password !== '')} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
