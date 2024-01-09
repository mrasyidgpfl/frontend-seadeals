import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Products from '../../api/products';
import Card from '../../components/Cards/Card';
import Pagination from '../../components/Pagination/Pagination';

import './RecommendationPage.scss';

const RecommendationPage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const innerRef = useRef(null);

  const getAllRecommendation = async () => {
    const filter = `?limit=30&page=${pagination.page}`;
    await Products.GetRecommendedProducts(filter)
      .then((resp) => {
        setProducts(resp.data.data.products);
        setPagination((prevState) => ({
          ...prevState,
          totalPage: resp.data.data.total_page,
        }));
        searchParams.set('page', String(pagination.page));
        setSearchParams(searchParams);
      })
      .catch((err) => err);
  };

  const handlePagination = (newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  useEffect(() => {
    getAllRecommendation().then();
  }, [
    pagination.page,
  ]);

  return (
    <div className="recommendation_page_container">
      <div className="recommendation_page_content">
        <div className="header" ref={innerRef}>
          <hr />
          <p className="title">Rekomendasi</p>
          <hr />
        </div>
        <div className="items_content">
          {
            products.map(
              (item: any) => (
                <Card
                  key={`${item.product.name}-${item.product.id}`}
                  data={item}
                  cardType="product-list"
                />
              ),
            )
          }
        </div>
        <div className="bottom_content">
          <Pagination
            page={pagination.page}
            totalPage={pagination.totalPage}
            setPage={handlePagination}
            innerRef={innerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
