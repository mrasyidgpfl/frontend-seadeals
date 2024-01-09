import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const UserLayout = () => (
  <div>
    <Navbar />
    <div className="main-content">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default UserLayout;
