import React from 'react';

import NavbarLeftContent from './NavbarLeftContent';
import NavbarRightContent from './NavbarRightContent';

import './Navbar.scss';
import NavbarCenterContent from './NavbarCenterContent';

const Navbar = () => (
  <div className="navbar_container">
    <div className="navbar_content">
      <NavbarLeftContent />
      <NavbarCenterContent />
      <NavbarRightContent />
    </div>
  </div>
);

export default Navbar;
