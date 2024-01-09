import React from 'react';
import './UserPage.scss';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar/UserSidebar';

const UserPage = () => (
  <div className="user-page_container">
    <div className="user-page_content">
      <UserSidebar />
      <Outlet />
    </div>
  </div>
);

export default UserPage;
