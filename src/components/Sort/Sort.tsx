import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Form from '../Form/Form';

import './Sort.scss';

type SortProps = {
  sortType: string;
  options: any[];
  values: string;
  handleInput: (event: any) => void;
};

const Sort = (props: SortProps) => {
  const {
    sortType,
    options,
    values,
    handleInput,
  } = props;

  const [searchParams] = useSearchParams();
  const getSearchParams = searchParams.get('searchInput');

  const items = [
    {
      inputType: 'select',
      name: 'sorting',
      label: 'Urutan',
      options,
      values,
    },
  ];

  return (
    <div className="sort_container">
      <div className="sort_content">
        <Form
          formType={sortType}
          items={items}
          values={values}
          handleInput={handleInput}
        />
        {
          getSearchParams
          && (
            <div className="search_values">
              Hasil pencarian untuk &apos;
              <p className="values">{ getSearchParams }</p>
              &apos;
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Sort;
