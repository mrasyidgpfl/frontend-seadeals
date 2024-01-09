import React, { FC } from 'react';

const MainMedia:FC<any> = ({ img, handleClicked }) => (
  <div
    className="border rounded product__media__main"
    onClick={handleClicked}
    role="presentation"
  >
    <img
      src={img.photo_url}
      alt={img.name}
    />
  </div>
);

export default MainMedia;
