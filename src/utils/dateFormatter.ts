import moment from 'moment';

const formatTime = (dateStr:string, isDateTime:boolean = true) => {
  if (!dateStr) return '';
  if (isDateTime) {
    return moment(dateStr).format('MMM DD YYYY, HH:mm');
  }
  return moment(dateStr).format('MMM DD YYYY');
};

export default formatTime;
