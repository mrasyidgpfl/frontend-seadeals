import React, { useEffect, useRef, useState } from 'react';

import './ReviewInfo.scss';
import { useSearchParams } from 'react-router-dom';
import Reviews from '../../../api/reviews';
import Card from '../../../components/Cards/Card';
import ReviewFilter from './ReviewFilter';
import { REVIEW_FILTER_ITEMS } from '../../../constants/product';
import Pagination from '../../../components/Pagination/Pagination';
import Sort from '../../../components/Sort/Sort';
import { SORT_REVIEWS } from '../../../constants/sort';
import { PHOTO_DEFAULT } from '../../../constants/user';

type ReviewInfoProps = {
  productId: number,
};

const ReviewInfo = (props: ReviewInfoProps) => {
  const {
    productId,
  } = props;

  const [reviews, setReviews] = useState<any>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });
  const [, setFilter] = useState('');
  const [totalFilter, setTotalFilter] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sorting, setSorting] = useState('');

  const sortOptions = SORT_REVIEWS;

  const innerRef = useRef(null);

  const splitReview = (review: any) => ({
    name: review.username,
    rating: review.rating,
    createdAt: review.created_at,
    avatarUrl: review.avatar_url ? review.avatar_url : PHOTO_DEFAULT,
    description: review.description,
    imgUrl: review.image_url,
    imgName: review.image_name,
  });

  const splitFilter = (review: any) => {
    const filters = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < review.length; i += 1) {
      filters[0] += 1;
      filters[review[i].rating] += 1;
      if (review[i].description) {
        filters[6] += 1;
      }
      if (review[i].image_url) {
        filters[7] += 1;
      }
    }
    setTotalFilter(filters);
  };

  const getAllReviews = async () => {
    await Reviews.GetReviewsByProductID(productId, '')
      .then((resp) => {
        const res = resp.data.data;
        splitFilter(res.reviews);
        setTotalReviews(res.total_reviews);
        setAverageRating(res.average_rating);
      });
  };

  const getReviews = async (filters: string = '') => {
    setFilter(filters);
    const tempFilter = `?limit=6${filters}`;
    await Reviews.GetReviewsByProductID(productId, tempFilter)
      .then((resp) => {
        const result = resp.data.data;
        setReviews(result.reviews);
        setPagination((prevState) => ({
          ...prevState,
          totalPage: result.total_pages,
        }));
      })
      .catch((err) => err);
  };

  const getReviewFilterItems = () => {
    let reviewFilterItems: any[] = REVIEW_FILTER_ITEMS;
    reviewFilterItems = reviewFilterItems.map(
      (item: any, index) => ({
        id: item.id,
        value: `${item.value} (${totalFilter[index]})`,
        filter: item.filter,
      }),
    );
    return reviewFilterItems;
  };

  const fillFilter = () => {
    let tempFilter = `&page=${pagination.page}`;
    if (selectedFilter !== '') {
      tempFilter += selectedFilter;
    }
    if (sorting !== '') {
      const sortBy = searchParams.get('sortBy');
      const sort = searchParams.get('sort');
      tempFilter += `&sortBy=${sortBy}&sort=${sort}`;
    }
    setFilter(tempFilter);
    return tempFilter;
  };

  const handlePagination = (newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));

    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  const handleFilter = (filters: string) => {
    if (selectedFilter === filters) {
      setSelectedFilter('');
    }
    if (selectedFilter !== filters) {
      setSelectedFilter(filters);
    }
    handlePagination(1);
  };

  const handleSort = (event: any) => {
    const { value } = event.target;
    setSorting(value);
    let sortBy = '';
    let sort = '';
    if (value === 'Terbaru') {
      sortBy = 'created_at';
      sort = 'desc';
    }
    if (value === 'Terlama') {
      sortBy = 'created_at';
      sort = 'asc';
    }

    if (sortBy !== '' && sort !== '') {
      searchParams.set('sortBy', sortBy);
      searchParams.set('sort', sort);
      setSearchParams(searchParams);
    }
    if (sortBy === '' || sort === '') {
      searchParams.delete('sortBy');
      searchParams.delete('sort');
    }
    handlePagination(1);
  };

  useEffect(() => {
    getAllReviews().then();
    getReviews().then();
  }, []);

  useEffect(() => {
    const tempFilter = fillFilter();
    getReviews(tempFilter).then();
  }, [
    selectedFilter,
    sorting,
    pagination.page,
  ]);

  return (
    <div className="review_info_container">
      <div className="review_info_content" ref={innerRef}>
        <div className="header">
          <div className="top_content">
            <h3 className="title">PENILAIAN PRODUK</h3>
            {
              reviews.length > 0
              && (
                <Sort
                  sortType="search"
                  options={sortOptions}
                  values={sorting}
                  handleInput={handleSort}
                />
              )
            }
          </div>
          {
            totalReviews > 0
            && (
              <ReviewFilter
                items={getReviewFilterItems()}
                value={selectedFilter}
                rating={averageRating}
                totalReviewer={totalReviews}
                handleFilter={handleFilter}
              />
            )
          }
        </div>
        <div className="items">
          {
            totalReviews > 0
            && (
              reviews.map(
                (item: any) => (
                  <Card
                    key={`${item.id}-${item.username}`}
                    data={splitReview(item)}
                    cardType="review"
                  />
                ),
              )
            )
          }
          {
            (totalReviews === 0 || reviews.length === 0)
            && (
              <p className="empty">Belum ada Penilaian</p>
            )
          }
        </div>
        {
          reviews.length > 0
          && (
            <Pagination
              page={pagination.page}
              totalPage={pagination.totalPage}
              setPage={handlePagination}
              innerRef={innerRef}
            />
          )
        }
      </div>
    </div>
  );
};

export default ReviewInfo;
