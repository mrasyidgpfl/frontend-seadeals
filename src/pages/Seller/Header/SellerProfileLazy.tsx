import React from 'react';
import ContentLoader from 'react-content-loader';

const SellerProfileLazy = () => (
  <ContentLoader
    className="p-2"
    speed={0.8}
    width={440}
    height={104}
    viewBox="0 0 440 104"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="103" y="5" rx="6" ry="6" width="156" height="12" />
    <circle cx="44" cy="43" r="44" />
    <rect x="104" y="34" rx="6" ry="6" width="189" height="12" />
    <rect x="108" y="65" rx="6" ry="6" width="80" height="18" />
    <rect x="208" y="63" rx="6" ry="6" width="80" height="18" />
  </ContentLoader>
);

export default SellerProfileLazy;
