import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER_SIDEBAR } from '../../../constants/user';
import noUserIcon from '../../../assets/png/anonym.png';

import './UserSidebar.scss';
import useAuth from '../../../hooks/useAuth';

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarItems = USER_SIDEBAR;
  const { auth } = useAuth();

  const avatar = auth.user.avatar_url;
  const { name } = auth.user;

  const hasSellerAcc = (authData:any) => {
    if (!authData) return false;
    const roles = authData.roles || [];
    return roles.includes('seller');
  };

  const goToLink = (link: string) => {
    navigate(link);
  };

  return (
    <div className="user-sidebar_container">
      <div className="user-sidebar_content">
        <div className="header">
          <div className="col-auto px-0">
            <img
              className="image"
              src={avatar || noUserIcon}
              alt={name}
            />
          </div>
          <p className="name">{ name }</p>
        </div>
        {
          sidebarItems.map(
            (item: any) => (
              <div
                key={item.name}
                className={`item ${
                  item.link === location.pathname
                    ? 'active'
                    : ''
                }`}
                onClick={() => goToLink(item.link)}
                role="presentation"
              >
                <p
                  className="name"
                >
                  { item.name }
                </p>
              </div>
            ),
          )
        }
      </div>
      {!hasSellerAcc(auth) && (
      <div className="user-sidebar_content">
        <a href="https://seller.reivaldo-julianto.com">
          <div className="item text-main">
            <p className="">Buka Toko SeaDeals</p>
          </div>
        </a>
      </div>
      )}
    </div>
  );
};

export default UserSidebar;
