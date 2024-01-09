import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

const SellerInfoItemLazy:FC<any> = ({ width = 196 }) => (
  <div className="seller-info d-flex gap-2 align-items-center mb-1 col-sm-6 col-md-5
    justify-content-md-start justify-content-center"
  >
    <ContentLoader
      speed={1}
      width={width}
      height={20}
      viewBox="0 0 200 20"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="5" y="5" rx="3" ry="3" width={width} height="20" />
    </ContentLoader>
  </div>
);

export default SellerInfoItemLazy;
