import React, { FC } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';
import ClickToCopy from '../../../components/Button/ClickToCopy';
import link from '../../../assets/svg/icon_link.svg';

import './ProductShare.scss';

const ProductShare:FC<any> = ({ url, text = 'Cek produk ini yuk!' }) => (
  <div className="product_share_container">
    <div className="product_share_content">
      <p className="variable">Bagikan:</p>
      <FacebookShareButton
        url={url}
        quote={text}
      >
        <FacebookIcon size={28} round />
      </FacebookShareButton>
      <WhatsappShareButton
        url={url}
        title={text}
        separator=":: "
      >
        <WhatsappIcon size={28} round />
      </WhatsappShareButton>
      <TwitterShareButton
        url={url}
        title={text}
      >
        <TwitterIcon size={28} round />
      </TwitterShareButton>
      <ClickToCopy text={url}>
        <img src={link} alt="share" className="mx-auto" style={{ height: '75%', width: '75%' }} />
      </ClickToCopy>
    </div>
  </div>
);

export default ProductShare;
