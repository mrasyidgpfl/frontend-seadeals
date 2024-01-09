import React from 'react';
import FooterTopContent from './FooterTopContent';
import FooterBottomContent from './FooterBottomContent';

import './Footer.scss';

const Footer = () => (
  <div className="footer_container">
    <div className="footer_content">
      <FooterTopContent />
      <FooterBottomContent />
    </div>
  </div>
);

export default Footer;
