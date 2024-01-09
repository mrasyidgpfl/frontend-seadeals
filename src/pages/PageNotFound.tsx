import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column vh-100 align-items-center justify-content-center">
      <div className="mb-4 text-center">
        <h3>Halaman tidak ditemukan</h3>
        <p>Sepertinya halaman yang kamu cari salah atau tidak terdaftar pada website ini</p>
      </div>
      <Button buttonType="primary" handleClickedButton={() => navigate('/login')} text="Home" />
    </div>
  );
};

export default PageNotFound;
