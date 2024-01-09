import React, { FC } from 'react';

type SellerInfoProps = {
  icon:string,
  info:string,
  desc: string,
};

const SellerInfoItem: FC<SellerInfoProps> = ({ icon, info, desc }) => (
  <div className="seller-info d-flex gap-2 align-items-center mb-1 col-sm-6 col-md-5
    justify-content-md-start justify-content-center"
  >
    <img alt="" src={icon} />
    <p>{info}</p>
    <p>{desc}</p>
  </div>
);

export default SellerInfoItem;
