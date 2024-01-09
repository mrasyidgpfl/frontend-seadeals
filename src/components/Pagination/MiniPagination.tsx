import React, { FC } from 'react';

const MiniPagination:FC<any> = ({ page, setPage, totalPage }) => (
  <div className="d-flex gap-1">
    <button
      type="button"
      disabled={page === 1 || page === ''}
      className={`text-secondary fw-bold fs-4 border rounded px-3 py-1 ${page === 1 ? 'bg-backdrop' : ''}`}
      onClick={() => setPage(page - 1)}
    >
      &#8249;
    </button>
    <button
      type="button"
      disabled={page === totalPage}
      className={`text-secondary fw-bold fs-4 border rounded px-3 py-1 ${page === totalPage ? 'bg-backdrop' : ''}`}
      onClick={() => setPage(page + 1)}
    >
      &#8250;
    </button>
  </div>
);

export default MiniPagination;
