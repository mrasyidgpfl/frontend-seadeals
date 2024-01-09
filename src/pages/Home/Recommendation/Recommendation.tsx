import React from 'react';

import './Recommendation.scss';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Cards/Card';
import Button from '../../../components/Button/Button';

type RecommendationProps = {
  data: any[];
  haveMore: boolean;
};

const Recommendation = (props: RecommendationProps) => {
  const {
    data,
    haveMore,
  } = props;
  const navigate = useNavigate();

  const goToRecommendationPage = () => {
    navigate('recommendation');
  };

  return (
    <div className="recommendation_container">
      <div className="recommendation_content">
        <div className="header">
          <h3 className="title">Rekomendasi</h3>
        </div>
        <div className="items_content">
          {
            data.map(
              (item) => (
                <Card
                  key={`${item.product.name}-${item.product.id}`}
                  data={item}
                  cardType="product-list"
                />
              ),
            )
          }
        </div>
        {
          haveMore
          && (
            <Button
              buttonType="primary alt show_all"
              text="Lihat Semua"
              handleClickedButton={goToRecommendationPage}
            />
          )
        }
      </div>
    </div>
  );
};

export default Recommendation;
