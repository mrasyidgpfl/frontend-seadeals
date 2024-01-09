import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import { ReactComponent as IconHeart } from '../../assets/svg/icon_heart.svg';
import { ReactComponent as IconChevron } from '../../assets/svg/icon_chevron_right.svg';
import { setAvatarURL, getFavoriteCount } from '../../features/navbarProfile/navbarProfileSlice';
import { AppDispatch } from '../../app/store';
import UserDropdown from './UserDropdown/UserDropdown';

const NavbarRightContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { favoriteCount, avatarURL } = useSelector((state:any) => state.navbarProfile);
  const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/avatars%2Fuser%2Fanonym.jpeg?alt=media&token=66dbb36a-2ac1-4b1f-ad67-b2834eefdcef';
  const hasUser = !!auth?.user?.user_id;

  const [showDropdown, setShowDropdown] = useState(false);

  const goToRegisterPage = () => {
    navigate('/register');
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  const openDropdown = () => {
    if (!hasUser) return;
    setShowDropdown(true);
  };

  useEffect(() => {
    if (hasUser) { dispatch(getFavoriteCount()); }
  }, [hasUser]);

  useEffect(() => {
    if (auth?.user?.avatar_url) {
      dispatch(setAvatarURL(auth.user.avatar_url));
    }
  }, [auth?.user?.avatar_url]);

  return (
    <div className="right_content">
      {
        !auth.user
        && (
          <div className="buttons">
            <Button
              buttonType="primary"
              text="Daftar"
              handleClickedButton={goToRegisterPage}
            />
            <Button
              buttonType="primary"
              text="Masuk"
              handleClickedButton={goToLoginPage}
            />
          </div>
        )
      }
      {
        auth.user
        && (
          <div className="buttons auth">
            <div className="favorite">
              {hasUser && favoriteCount !== 0 && (
              <div className="favorite_count_number d-flex align-items-center justify-content-center rounded">
                <small className="text-center mb-0 fw-bold d-flex align-items-center mt-1">
                  {favoriteCount}
                </small>
              </div>
              )}
              <Button
                buttonType="plain"
                iconUrl={IconHeart}
                iconName="favorite"
                handleClickedButton={goToLoginPage}
              />
            </div>
            <div
              className="profile"
              role="presentation"
              onMouseEnter={() => openDropdown()}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="image_content">
                <img
                  className="image"
                  src={avatarURL || defaultPic}
                  alt={auth.user.username}
                />
              </div>
              <Button
                buttonType="plain right"
                text={auth.user.username}
                iconUrl={IconChevron}
                iconName="chevron"
                handleClickedButton={openDropdown}
              />
              {
                showDropdown
                && (
                  <UserDropdown />
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default NavbarRightContent;
