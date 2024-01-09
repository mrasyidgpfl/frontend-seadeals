import React from 'react';
import ContentLoader from 'react-content-loader';

const CardProductLazy = () => (
  <ContentLoader
    speed={0.75}
    width={200}
    height={342}
    viewBox="0 0 200 342"
    backgroundColor="#ededed"
    foregroundColor="#e6e6e6"
  >
    <rect x="4" y="2" rx="7" ry="7" width="192" height="192" />
    <rect x="4" y="214" rx="6" ry="6" width="192" height="16" />
    <rect x="4" y="242" rx="5" ry="5" width="192" height="16" />
    {/* <rect x="4" y="270" rx="5" ry="5" width="192" height="16" /> */}
  </ContentLoader>
);

export default CardProductLazy;
