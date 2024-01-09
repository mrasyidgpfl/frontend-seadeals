const formatTitle = (title:any) => {
  if (!title) return title;
  const wordArr = title.split(' ');

  return wordArr.map((word:any) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
};

export default formatTitle;
