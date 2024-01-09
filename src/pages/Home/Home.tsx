import React, { useEffect, useState } from 'react';

import './Home.scss';
import Category from './Category/Category';
import ProductCategories from '../../api/product_categories';
import Products from '../../api/products';
import Recommendation from './Recommendation/Recommendation';
import PromotionBanner from './PromotionBanner/PromotionBanner';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [haveMoreRecommended, setHaveMoreRecommended] = useState(false);

  const getAllCategories = async () => {
    await ProductCategories.GetAllCategories()
      .then((resp) => {
        setCategories(resp.data.data.categories);
      })
      .catch((err) => err);
  };

  const getRecommendedProducts = async () => {
    await Products.GetRecommendedProducts('?limit=20')
      .then((resp) => {
        if (resp.data.data.products.length > 18) {
          setHaveMoreRecommended(true);
        }
        setRecommendedProducts(resp.data.data.products.slice(0, 18));
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getAllCategories().then();
    getRecommendedProducts().then();
  }, []);

  return (
    <div className="home_container">
      <div className="home_content">
        <PromotionBanner />
        {
          categories.length !== 0
          && (
            <Category data={categories} />
          )
        }
        {
          recommendedProducts.length !== 0
          && (
            <Recommendation
              data={recommendedProducts}
              haveMore={haveMoreRecommended}
            />
          )
        }
      </div>
    </div>
  );
};
export default Home;
