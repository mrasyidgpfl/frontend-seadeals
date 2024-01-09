import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import dateFormatter from '../../../utils/dateFormatter';

const InputUserProfile:FC<any> = ({
  name, data, label, handleChange, isChangeable, typeElement,
}) => {
  const [value, setValue] = useState('');

  const displayDatetime = (time: string) => moment(time).format('YYYY-MM-DD');

  useEffect(() => {
    if (isChangeable) {
      if (typeElement === 'date') {
        setValue(displayDatetime(data));
      }
      return;
    } if (!isChangeable && typeElement === 'date') {
      const tmp = dateFormatter(data, false);
      setValue(tmp);
      return;
    }
    setValue(data);
  }, [data, isChangeable]);

  return (
    <div className="my-2">
      <p className="caption-input">{label}</p>
      <input
        className="form-control"
        name={name}
        value={value}
        type={isChangeable ? typeElement : 'text'}
        onChange={handleChange}
        disabled={!isChangeable}
        readOnly={!isChangeable}
      />
    </div>
  );
};

export default InputUserProfile;
