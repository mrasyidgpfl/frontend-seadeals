import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ORDER_HISTORY_NAVIGATION } from '../../../../constants/user';

import './OrderHistoryNavigation.scss';

const OrderHistoryNavigation = () => {
  const [params, setParams] = useSearchParams();
  const getType = params.get('type');
  const navigationItems = ORDER_HISTORY_NAVIGATION;

  const changeNavigation = (type: string) => {
    params.set('type', type);
    setParams(params);
  };

  useEffect(() => {
    params.set('type', 'all');
    setParams(params);
  }, []);

  return (
    <div className="order-history-navigation_container">
      <div className="order-history-navigation_content">
        {
          navigationItems.map(
            (item: any) => (
              <div
                key={item.name}
                className={`item ${
                  getType === item.params
                    ? 'active'
                    : ''
                }`}
                onClick={() => changeNavigation(item.params)}
                role="presentation"
              >
                <p className="name">
                  { item.name }
                </p>
              </div>
            ),
          )
        }
      </div>
    </div>
  );
};

export default OrderHistoryNavigation;
