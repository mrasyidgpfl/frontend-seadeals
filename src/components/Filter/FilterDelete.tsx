import React from 'react';
import Button from '../Button/Button';

type FilterDeleteProps = {
  handleDeleteAll: () => void;
};

const FilterDelete = (props: FilterDeleteProps) => {
  const {
    handleDeleteAll,
  } = props;

  return (
    <Button
      buttonType="secondary"
      text="Hapus Semua"
      handleClickedButton={handleDeleteAll}
    />
  );
};

export default FilterDelete;
