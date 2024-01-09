import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  backToUrl:string,
  text:string,
}

const WalletHeader:FC<Props> = ({ backToUrl, text }) => (
  <div className="px-4 mb-4 d-flex align-items-center gap-3">
    <div className="normal-link mb-2">
      <Link to={backToUrl}>
        <h3>&#8249;</h3>
      </Link>
    </div>
    <h4 className="mb-1">
      {text}
    </h4>
  </div>
);

export default WalletHeader;
