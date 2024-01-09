import React from 'react';
import { Link } from 'react-router-dom';

const PINHeader = () => (
  <div className="px-4 mb-4 d-flex align-items-center gap-3">
    <div className="normal-link mb-2">
      <Link to="/wallet">
        <h3>&#8249;</h3>
      </Link>
    </div>
    <h4 className="mb-1">
      Settings
    </h4>
  </div>
);

export default PINHeader;
