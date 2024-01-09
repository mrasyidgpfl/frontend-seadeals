import React from 'react';
import FooterLeftContent from './FooterLeftContent';
import FooterCenterContent from './FooterCenterContent';
import FooterRightContent from './FooterRightContent';

const FooterTopContent = () => (
  <div className="top_content">
    <FooterLeftContent />
    <FooterCenterContent />
    <FooterRightContent />
  </div>
);

export default FooterTopContent;
