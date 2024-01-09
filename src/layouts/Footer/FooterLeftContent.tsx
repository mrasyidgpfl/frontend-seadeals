import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/png/logo_sea_deals.png';

const FooterLeftContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    if (location.pathname !== '/') {
      navigate('');
    }
  };

  return (
    <div className="left_content">
      <img
        className="image"
        src={Logo}
        alt="sea_deals"
        onClick={goToHome}
        role="presentation"
      />
      <p className="text">
        Tempat kamu bisa menemukan barang elektronik&nbsp;
        yang kamu cari.&nbsp;
        Yuk belanja di SeaDeals saja!
      </p>
    </div>
  );
};

export default FooterLeftContent;
