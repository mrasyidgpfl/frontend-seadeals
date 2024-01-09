import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Button from '../../../components/Button/Button';
import useLogout from '../../../hooks/useLogout';

import './UserDropdown.scss';

const UserDropdown = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const goToAccount = () => {
    navigate('user/profile');
  };

  const goToOrderHistory = () => {
    navigate('user/order-history');
  };

  const logoutAccount = () => {
    logout()
      .then(
        () => {
          toast.success('Anda berhasil keluar');
        },
      )
      .catch(
        () => {
          toast.error('Gagal keluar');
        },
      );
  };

  return (
    <div className="user-dropdown_container">
      <div className="user-dropdown_content">
        <Button
          buttonType="plain"
          text="Akun Saya"
          handleClickedButton={goToAccount}
        />
        <Button
          buttonType="plain"
          text="Pesanan Saya"
          handleClickedButton={goToOrderHistory}
        />
        <Button
          buttonType="secondary alt"
          text="Keluar Akun"
          handleClickedButton={logoutAccount}
        />
      </div>
    </div>
  );
};

export default UserDropdown;
