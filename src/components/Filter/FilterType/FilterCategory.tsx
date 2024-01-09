import React from 'react';
import Button from '../../Button/Button';

type FilterCategoryProps = {
  filterClass: string;
  data: any[];
  values: any;
  handleInput: (event: any) => void;
  handleDelete: () => void;
};

const FilterCategory = (props: FilterCategoryProps) => {
  const {
    filterClass,
    data,
    values,
    handleInput,
    handleDelete,
  } = props;

  return (
    <div className="filter_category_container">
      <div className="filter_category_content">
        <h3 className="title">Kategori</h3>
        <div className={`items_content ${filterClass}`}>
          {
            data.map(
              (item: any) => (
                <div
                  key={`${item.name}-${item.id}`}
                  className={`category ${values === item.id ? 'active' : ''}`}
                  onClick={() => handleInput(item.id)}
                  role="presentation"
                >
                  {item.name}
                </div>
              ),
            )
          }
        </div>
        <Button
          buttonType="secondary"
          text="Hapus"
          handleClickedButton={handleDelete}
        />
      </div>
    </div>
  );
};

export default FilterCategory;
