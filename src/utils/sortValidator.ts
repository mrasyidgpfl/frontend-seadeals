// if input is neither, input is changed into the default option ('')
export const validateSortOption = (option:string) => {
  if (option !== 'date' && option !== 'price') return '';
  return option;
};
export const validateSortOrder = (order:string) => {
  if (order !== 'asc' && order !== 'desc') return '';
  return order;
};

export default validateSortOption;
