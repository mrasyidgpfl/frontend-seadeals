import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Products from '../../../api/products';
import Card from '../../../components/Cards/Card';
import Button from '../../../components/Button/Button';
import { ReactComponent as IconChevronRight } from '../../../assets/svg/icon_chevron_right.svg';

type SellerProductProps = {
  sellerId: number,
  productId: number,
};

const SellerProduct = (props: SellerProductProps) => {
  const {
    sellerId,
    productId,
  } = props;

  const [sellerProduct, setSellerProduct] = useState([]);

  const navigate = useNavigate();

  const getSellerProduct = async () => {
    const filter = `?limit=12&sellerID=${sellerId}&excludedID=${productId}`;
    await Products.GetAllProducts(filter)
      .then((resp) => {
        setSellerProduct(resp.data.data.products);
      })
      .catch((err) => err);
  };

  const goToSellerPage = () => {
    navigate(`/toko/${sellerId}`);
  };

  useEffect(() => {
    getSellerProduct().then();
  }, []);

  return (
    <div className={`seller_product_container ${sellerProduct.length === 0 ? 'hide' : ''}`}>
      {
        sellerProduct.length > 0
        && (
          <div className="seller_product_content">
            <div className="header">
              <h3 className="title">PRODUK LAIN DARI TOKO INI</h3>
              {
                sellerProduct.length === 12
                && (
                  <Button
                    buttonType="plain right"
                    text="Lihat semua"
                    iconUrl={IconChevronRight}
                    iconName="all"
                    handleClickedButton={goToSellerPage}
                  />
                )
              }
            </div>
            <div className="items">
              {
                sellerProduct?.map(
                  (item: any) => (
                    <Card
                      key={`${item.product.id}-${item.product.name}`}
                      data={item}
                      cardType="product-list"
                    />
                  ),
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default SellerProduct;
