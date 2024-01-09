import React from 'react';
import FilterCategory from './FilterType/FilterCategory';

import './Filter.scss';
import FilterPrice from './FilterType/FilterPrice';
import FilterRating from './FilterType/FilterRating';
import FilterLocation from './FilterType/FilterLocation';

type FilterRequiredProps = {
  filterType: string;
  filterClass: string;
  data: any[];
  values: any;
  handleInput: (event: any) => void;
  handleDelete: () => void;
};

type FilterOptionalProps = {
  setInput?: any;
};

interface FilterProps
  extends FilterRequiredProps,
  FilterOptionalProps {}

const defaultProps: FilterOptionalProps = {
  setInput: '',
};

const Filter = (props: FilterProps) => {
  const {
    filterType,
    filterClass,
    data,
    values,
    handleInput,
    handleDelete,
    setInput,
  } = props;

  return (
    <div className="filter_container">
      <div className="filter_content">
        {
          filterType === 'category'
          && (
            <FilterCategory
              filterClass={filterClass}
              data={data}
              values={values}
              handleInput={handleInput}
              handleDelete={handleDelete}
            />
          )
        }
        {
          filterType === 'price'
          && (
            <FilterPrice
              filterClass={filterClass}
              data={data}
              values={values}
              handleInput={handleInput}
              handleDelete={handleDelete}
              setInput={setInput}
            />
          )
        }
        {
          filterType === 'rating'
          && (
            <FilterRating
              filterClass={filterClass}
              values={values}
              handleInput={handleInput}
              handleDelete={handleDelete}
            />
          )
        }
        {
          filterType === 'location'
          && (
            <FilterLocation
              filterClass={filterClass}
              data={data}
              handleInput={handleInput}
              handleDelete={handleDelete}
            />
          )
        }
      </div>
    </div>
  );
};

Filter.defaultProps = defaultProps;

export default Filter;
