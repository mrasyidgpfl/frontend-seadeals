import React, { useState } from 'react';

import banner1 from '../../../assets/png/promotion_banner.png';
import banner2 from '../../../assets/png/promotion_banner_2.png';
import banner3 from '../../../assets/png/promotion_banner_3.png';

import './PromotionBanner.scss';

const PromotionBanner = () => {
  const [counter, setCounter] = useState(0);

  const handleInd1 = () => {
    setCounter(0);
  };

  const handleInd2 = () => {
    setCounter(1);
  };

  const handleInd3 = () => {
    setCounter(2);
  };

  return (
    <div className="promotion_container row justify-content-center">
      <div className="banner_container col-12" style={{ textAlign: 'center' }}>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              id="indicator"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className={counter === 0 ? 'active' : ''}
              aria-current="true"
              aria-label="Slide 1"
              onClick={handleInd1}
            />
            <button
              id="indicator"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              className={counter === 1 ? 'active' : ''}
              aria-label="Slide 2"
              onClick={handleInd2}
            />
            <button
              id="indicator"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              className={counter === 2 ? 'active' : ''}
              aria-label="Slide 3"
              onClick={handleInd3}
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={banner1} className="d-block w-100" alt="banner 1" />
            </div>
            <div className="carousel-item">
              <img src={banner2} className="d-block w-100" alt="banner 2" />
            </div>
            <div className="carousel-item">
              <img src={banner3} className="d-block w-100" alt="banner 3" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
