import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface SLPIFrameProps {
  url:string
  closeModal: ()=>void
}

const SLPIframeFull:FC<SLPIFrameProps> = ({ url, closeModal }) => {
  const navigate = useNavigate();
  const onLoad = () => {
    // @ts-ignore
    const iframeLocation = document.getElementById('spay-iframe').contentWindow.location;
    const urlParams = new URLSearchParams(iframeLocation.search);
    const status = urlParams.get('status');
    if (status === 'TXN_FAILED') { // @ts-ignore
      // window.top.location.href = '/';
      closeModal();
      navigate('/cart');
    }
    if (status === 'TXN_PAID') {
      // fetch transaction_id from slp_trx_holders where txn_id = urlParams.get('txn_id');
      // redirect to orders/transaction_id/
    }
  };

  return (
    <iframe
      id="spay-iframe"
      title="SeaLabs Pay"
      src={url}
      className="w-100 h-100"
      onLoad={onLoad}
    />
  );
};

export default SLPIframeFull;
