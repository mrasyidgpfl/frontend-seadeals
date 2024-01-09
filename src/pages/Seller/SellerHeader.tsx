import React, { FC } from 'react';
import SellerInfoItem from './Header/SellerInfoItem';
import joined_icon from '../../assets/svg/icon_joined.svg';
import rating_icon from '../../assets/svg/icon_rating.svg';
import products_icon from '../../assets/svg/icon_product.svg';
import followers_icon from '../../assets/svg/icon_followers.svg';
import SellerProfile from './Header/SellerProfile';
import SellerProfileLazy from './Header/SellerProfileLazy';
import SellerInfoItemLazy from './Header/SellerInfoItemLazy';

interface SellerInfo {
  loading: boolean
  sellerInfo: SellerHeaderProps
}

type SellerHeaderProps = {
  id: number,
  name: string
  imgUrl: string,
  followers: string,
  joinDate: string,
  rating: string,
  reviewer: string,
  city: string,
  isFollowing: boolean,
  totalProduct: number,
};

const SellerHeader: FC<SellerInfo> = ({ loading, sellerInfo }) => (
  <div className="container bg-white py-4 rounder shadow-sm mb-3">
    <div className="row">
      <div className="col-md-4 col-12">
        {
          loading
            ? <SellerProfileLazy />
            : <SellerProfile profile={sellerInfo} />
        }
      </div>
      <div className="col-md-8 col-12 p-2 row justify-content-center align-items-center">
        {
          loading
            ? (
              <>
                <SellerInfoItemLazy />
                <SellerInfoItemLazy />
                <SellerInfoItemLazy width={162} />
                <SellerInfoItemLazy width={162} />
              </>
            )
            : (
              <>
                <SellerInfoItem icon={joined_icon} info="Join:" desc={sellerInfo?.joinDate} />
                <SellerInfoItem icon={rating_icon} info="Rating:" desc={`${sellerInfo?.rating} (${sellerInfo?.reviewer} Penilaian)`} />
                <SellerInfoItem icon={products_icon} info="Produk:" desc={`${sellerInfo?.totalProduct}`} />
                <SellerInfoItem icon={followers_icon} info="Followers:" desc={sellerInfo?.followers} />
              </>
            )
        }
      </div>
    </div>
  </div>
);

export default SellerHeader;
