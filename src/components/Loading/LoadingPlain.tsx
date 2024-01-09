import React, { FC } from 'react';
import loadingLogo from '../../assets/svg/loading.svg';

interface LoadingProp {
  height: number
}

const LoadingPlain:FC<LoadingProp> = ({ height }) => (
  <img src={loadingLogo} alt="loading" height={height} />
);

export default LoadingPlain;
