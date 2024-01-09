import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import location_icon from '../../../assets/svg/icon_location.svg';
import share_icon from '../../../assets/svg/icon_share.svg';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';

const SellerProfile: FC<any> = ({ profile }) => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const clickToCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link Copied!');
  };

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [followStatus, setFollowStatus] = useState(!!profile.isFollowing);

  const updateFollowStatus = async () => {
    if (loadingUpdate) return;
    if (!auth?.user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setLoadingUpdate(true);
    try {
      const response = await axiosPrivate.post(
        'sellers/follow',
        JSON.stringify({ seller_id: profile.id }),
      );
      const { data } = response.data;
      setFollowStatus(data?.is_follow || false);
    } catch (e:any) {
      toast.error('failed updating following status');
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className="row gap-1 text-start p-2 justify-content-center">
      <div className="col-auto d-flex justify-content-start px-0">
        <div className="seller-avatar">
          <img alt="shop name" className="img-fluid rounded-circle" src={profile?.imgUrl} />
        </div>
      </div>
      <div className="col-auto">
        <div className="mb-2 text-xl-start text-center">
          <p className="fw-bold fs-5">{profile?.name}</p>
          <img alt="" src={location_icon} />
          <small>{profile?.city}</small>
        </div>
        <div className="d-flex gap-2">
          <button
            style={{ width: '120px' }}
            type="button"
            className={`btn border px-4 py-0 ${followStatus ? 'border-main' : ''}`}
            onClick={() => updateFollowStatus()}
          >
            <small className="fw-bold">{followStatus ? 'Following' : 'Follow'}</small>
          </button>
          <button
            type="button"
            className="btn border px-3 py-0 d-flex justify-content-center align-items-center gap-1"
            onClick={() => clickToCopy()}
          >
            <img alt="" src={share_icon} />
            <small className="fw-bold">Share</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
