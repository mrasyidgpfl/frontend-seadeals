import React, { useEffect, useState } from 'react';
import ProductMedia from './Media/ProductMedia';
import ProductShare from './Share/ProductShare';
import HeaderInfo from './Header/HeaderInfo';
import ProductFavorite from './Favorite/ProductFavorite';

type ProductHeaderProps = {
  product: any,
  sellerUserID: number,
};

const ProductHeader = (props: ProductHeaderProps) => {
  const {
    product, sellerUserID,
  } = props;

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setPhotos(product.product.product_photos);
  }, [product]);

  return (
    <div className="product_header_container">
      <div className="product_header_content">
        <div className="left_content">
          <ProductMedia photos={photos} />
          <div className="bottom">
            <ProductShare url={window.location.href} />
            <ProductFavorite
              isFavorite={product.product.favorite}
              favorite={product.product.favorite_count}
              productId={product.product.id}
            />
          </div>
        </div>
        <div className="right_content">
          <HeaderInfo data={product} sellerUserID={sellerUserID} />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
