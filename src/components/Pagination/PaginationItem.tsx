import React, { FC } from 'react';

const PaginationItem: FC<any> = ({ pageNumber, active, setPage }) => (
  <button
    type="button"
    onClick={setPage}
    className={`p-2 px-3 fs-5 pagination__item shadow-sm ${active ? 'bg-main text-white' : ''}`}
  >
    {pageNumber}
  </button>
);

export default PaginationItem;
