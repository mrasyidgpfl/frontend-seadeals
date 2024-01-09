import React, { FC } from 'react';

const SLPIframe:FC<any> = ({ url }) => {
  const onLoad = () => {
    // @ts-ignore
    const iframeLocation = document.getElementById('spay-iframe').contentWindow.location;
    const urlParams = new URLSearchParams(iframeLocation.search);
    const status = urlParams.get('status');
    if (status === 'TXN_PAID') { // @ts-ignore
      // window.top.location.href = '/';
    }
  };

  return (
    <iframe
      id="spay-iframe"
      title="SeaLabs Pay"
      src={url}
      className="slp-window"
      onLoad={onLoad}
    />
  );
};

export default SLPIframe;
