import React, { useEffect, useState } from 'react';

import './SellerInfo.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { SELLER_INFO } from '../../../constants/product';
import { ReactComponent as IconStar } from '../../../assets/svg/icon_star.svg';
import { formatCount } from '../../../utils/product';

type SellerInfoProps = {
  seller: any,
};

const SellerInfo = (props: SellerInfoProps) => {
  const { seller } = props;
  const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/bucket-seadeals.appspot.com/o/avatars%2Fuser%2Fanonym.jpeg?alt=media&token=66dbb36a-2ac1-4b1f-ad67-b2834eefdcef';

  const [sellerItems, setSellerItems] = useState<any>([]);
  const navigate = useNavigate();

  const goToSellerPage = () => {
    navigate(`/toko/${seller.id}`);
  };

  const getSellerItems = () => {
    const items = SELLER_INFO;

    items[0].value = seller.rating;
    items[1].value = formatCount(seller.followers);
    items[2].value = seller.join_date;
    items[3].value = formatCount(seller.total_reviewer);
    items[4].value = formatCount(seller.total_product);

    setSellerItems(items);
  };

  useEffect(() => {
    getSellerItems();
  }, [seller]);

  return (
    <div className="seller_info_container">
      <div className="seller_info_content">
        <div className="info first_content">
          <img
            className="image"
            src={seller.profile_url || defaultPic}
            alt={seller.name}
            onClick={goToSellerPage}
            role="presentation"
          />
        </div>
        <div className="info second_content">
          <p
            className="name"
            onClick={goToSellerPage}
            role="presentation"
          >
            { seller.name }
          </p>
          <Button
            buttonType="primary"
            text="Kunjungi Toko"
            handleClickedButton={goToSellerPage}
          />
        </div>
        <div className="info third_content">
          {
            sellerItems?.map(
              (item: any) => (
                <div
                  key={`${item.variable}-${item.value}`}
                  className={`item ${item.classes}`}
                >
                  <div className="variable">
                    { item.variable }
                  </div>
                  <div className="value">
                    { item.value }
                    {
                      item.classes === 'rating'
                      && React.createElement(IconStar, { className: 'star' })
                    }
                  </div>
                </div>
              ),
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
