import React from 'react';
import ContentLoader from 'react-content-loader';

const CardCategoryLazy = () => (
  <ContentLoader
    speed={0.75}
    width={166}
    height={226}
    viewBox="0 0 166 226"
    backgroundColor="#f2f2f2"
    foregroundColor="#e6e6e6"
  >
    <circle cx="80" cy="86" r="56" />
    <rect x="25" y="158" rx="2" ry="2" width="112" height="14" />
  </ContentLoader>
);

export default CardCategoryLazy;
