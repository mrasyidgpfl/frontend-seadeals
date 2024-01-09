import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.scss';
import ProductDetail from './ProductDetail';
import ProductHeader from './ProductHeader';
import Products from '../../api/products';
import { PRODUCT_SPECIFICATION } from '../../constants/product';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SellerInfo from './Seller/SellerInfo';
import SellerProduct from './SellerProduct/SellerProduct';
import SimilarProduct from './SimilarProduct/SimilarProduct';
import ReviewInfo from './Review/ReviewInfo';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>({});
  const [productDetail, setProductDetail] = useState<any>({
    description: '',
    specification: [],
  });
  const [productSeller, setProductSeller] = useState<any>({});
  const [, setLoadingProduct] = useState(true);

  const axiosPrivate = useAxiosPrivate();

  const getID = () => {
    const splitSlug = slug?.split('.');
    return splitSlug ? splitSlug[splitSlug.length - 1] : '';
  };

  const setSpecificationItems = (prod: any, seller: any) => {
    const spec = [...PRODUCT_SPECIFICATION];

    spec[0].value = prod.product.category.name;
    spec[1].value = prod.product.product_detail.condition_status;
    spec[2].value = prod.product.product_detail.length;
    spec[3].value = prod.product.product_detail.width;
    spec[4].value = prod.product.product_detail.height;
    spec[5].value = prod.product.product_detail.weight;
    spec[6].value = prod.total_stock;
    spec[7].value = seller.address.city;

    return spec;
  };

  const getProduct = async () => {
    await Products.GetProductByID(axiosPrivate, parseInt(getID(), 10))
      .then((resp: any) => {
        const newProduct = resp.data.data.product_detail;
        const prodSeller = resp.data.data.seller;
        setProduct(newProduct);
        setProductSeller(prodSeller);
        const getDesc = newProduct.product.product_detail.description;
        const getSpec = setSpecificationItems(newProduct, prodSeller);
        setProductDetail({
          description: getDesc,
          specification: getSpec,
        });
      })
      .catch((err: any) => err)
      .finally(() => {
        setLoadingProduct(false);
      });
  };

  useEffect(() => {
    console.log(slug);
    setLoadingProduct(true);
    setProduct({});
    setProductDetail({
      description: '',
      specification: [],
    });
    setProductSeller({});
    getProduct().then();
  }, [slug]);

  return (
    <div className="product_page_container">
      {
        Object.keys(product).length > 0
        && (
          <div className="product_page_content">
            <ProductHeader
              product={product}
              sellerUserID={productSeller.user_id}
            />
            <SellerInfo seller={productSeller} />
            <ProductDetail
              description={productDetail.description}
              specification={productDetail.specification}
            />
            <ReviewInfo
              productId={product.product.id}
            />
            <SellerProduct
              sellerId={productSeller.id}
              productId={product.product.id}
            />
            <SimilarProduct
              productId={product.product.id}
              productSlug={product.product.slug}
            />
          </div>
        )
      }
    </div>
  );
};

export default ProductPage;
