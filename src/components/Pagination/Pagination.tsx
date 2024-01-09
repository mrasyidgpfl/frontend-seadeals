import React, { FC } from 'react';
import PaginationItem from './PaginationItem';
import './Pagination.css';

interface PaginationProps {
  totalPage: number
  page: number
  setPage: any
  innerRef: any
}

const Pagination: FC<PaginationProps> = ({
  totalPage, page, setPage, innerRef,
}) => {
  const changePage = (num:number) => {
    innerRef.current?.scrollIntoView({ behavior: 'smooth' });
    setPage(num);
  };
  return (
    <div className="pt-3 pagination_container">
      <div className="d-flex gap-2 justify-content-center">
        <PaginationItem pageNumber="&#171;" setPage={() => changePage(1)} />
        {Array(totalPage).fill(0).map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <PaginationItem active={page === i + 1} key={i} pageNumber={`${i + 1}`} setPage={() => changePage(i + 1)} />
        ))}
        <PaginationItem pageNumber="&#187;" setPage={() => changePage(totalPage)} />
      </div>
    </div>

  );
};

export default Pagination;
