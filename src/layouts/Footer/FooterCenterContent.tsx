import React from 'react';
import CATEGORY_ITEMS from '../../constants/category';

const FooterCenterContent = () => {
  const items = CATEGORY_ITEMS;

  return (
    <div className="center_content">
      <h5 className="title">Kategori</h5>
      <div className="items_content">
        {
          items.map(
            (item) => (
              <div
                key={`${item.name}`}
                className="item"
              >
                <a
                  href={item.path}
                >
                  { item.name }
                </a>
              </div>
            ),
          )
        }
      </div>
    </div>
  );
};

export default FooterCenterContent;
