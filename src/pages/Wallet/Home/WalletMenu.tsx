import React from 'react';
import { Link } from 'react-router-dom';
// import accountIcon from '../../../assets/svg/account.svg';
// import payIcon from '../../../assets/svg/pay_s.svg';
import trxIcon from '../../../assets/svg/transactions.svg';

const WalletMenu = () => (
  <div className="d-flex justify-content-center normal-link gap-1">
    {/* <Link to="pay"> */}
    {/*  <div className="p-2 wallet__menu__items"> */}
    {/*    <img alt="transactions" src={payIcon} height="20px" /> */}
    {/*    <small className="fw-bold d-block text-secondary-blue">Bayar</small> */}
    {/*  </div> */}
    {/* </Link> */}
    {/* <Link to="accounts"> */}
    {/*  <div className="p-2 wallet__menu__items"> */}
    {/*    <img alt="transactions" src={accountIcon} height="20px" /> */}
    {/*    <small className="fw-bold d-block text-secondary-blue">Akun</small> */}
    {/*  </div> */}
    {/* </Link> */}
    <Link to="history">
      <div className="p-2 wallet__menu__items">
        <img alt="transactions" src={trxIcon} height="20px" />
        <small className="fw-bold d-block text-secondary-blue">Riwayat</small>
      </div>
    </Link>
  </div>
);

export default WalletMenu;
