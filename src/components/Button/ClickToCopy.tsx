import React, { FC } from 'react';
import toast from 'react-hot-toast';

interface Props {
  children: JSX.Element
  text: string
}

const ClickToCopy:FC <Props> = ({ children, text }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(text);
    toast.success('Link telah disalin');
  };

  return (
    <button
      type="button"
      className="p-0 border d-flex align-items-center rounded-circle"
      style={{
        height: '30px',
        width: '28px',
        marginTop: '1px',
      }}
      onClick={copyLink}
    >
      {children}
    </button>
  );
};

export default ClickToCopy;
