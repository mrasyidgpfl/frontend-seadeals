import React, { FC, useState } from 'react';
import ProductListCatSelect from './ProductListCatSelect';
import SidebarPriceFilter from './SidebarPriceFilter';
import Loading from '../../../components/Loading/Loading';

const ProductListCatSidebar:FC<any> = ({
  loading, categories, categoryState, minPriceState, maxPriceState, setParam,
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="col-md-2 col-12 px-0">
      <div className="bg-white p-4 shadow-sm rounder mb-3 text-start">
        <h5 className="fw-bold mb-3">Kategori</h5>
        {
          loading ? <Loading height={100} />
            : (
              <>
                <ProductListCatSelect
                  active={categoryState.categoryID === ''}
                  title="Semua Produk"
                  changeCategory={() => categoryState.changeCategory('')}
                />
                {
                      categories.map((category:any, idx:number) => {
                        if (showAll || idx < 4) {
                          return (
                            <ProductListCatSelect
                              key={category.id}
                              title={category.name}
                              active={categoryState.categoryID === category.id}
                              changeCategory={() => categoryState.changeCategory(category.id)}
                            />
                          );
                        }
                        return '';
                      })
                  }
                <button
                  type="button"
                  className="text-main fw-bold pt-4"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? 'Sembunyikan' : 'Lihat Semua'}
                </button>
              </>
            )
          }
      </div>
      <SidebarPriceFilter
        setParam={setParam}
        minPriceState={minPriceState}
        maxPriceState={maxPriceState}
      />
    </div>
  );
};
export default ProductListCatSidebar;
