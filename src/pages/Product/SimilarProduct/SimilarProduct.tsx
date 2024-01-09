import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Products from '../../../api/products';
import Card from '../../../components/Cards/Card';
import Button from '../../../components/Button/Button';

type SimilarProductProps = {
  productId: number,
  productSlug: string,
};

const SimilarProduct = (props: SimilarProductProps) => {
  const {
    productId,
    productSlug,
  } = props;

  const [similarProduct, setSimilarProduct] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const navigate = useNavigate();

  const getSimilarProducts = async () => {
    await Products.GetSimilarProducts(productId, '')
      .then((resp) => {
        setSimilarProduct(resp.data.data.products);
        setTotalProduct(resp.data.data.total_data);
      })
      .catch((err) => err);
  };

  const goToSimilarPage = () => {
    navigate(`/similar/${productSlug}`);
  };

  useEffect(() => {
    getSimilarProducts().then();
  }, []);

  return (
    <div className={`similar_product_container ${similarProduct.length === 0 ? 'hide' : ''}`}>
      {
        similarProduct.length > 0
        && (
          <div className="similar_product_content">
            <div className="header">
              <h3 className="title">PRODUK SERUPA</h3>
            </div>
            <div className="items">
              {
                similarProduct?.map(
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
            {
              totalProduct > 24
              && (
                <Button
                  buttonType="primary alt show_all"
                  text="Lihat Semua"
                  handleClickedButton={goToSimilarPage}
                />
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default SimilarProduct;
