import React, { FC } from 'react';

interface CourierOptionsProps {
  isSelected: boolean,
  setOption: ()=>void,
  name: string,
}

const CourierOptions:FC<CourierOptionsProps> = ({ isSelected, setOption, name }) => (
  <div
    className={`border rounded p-3 hover-click mb-3 ${isSelected && 'border-main'}`}
    role="presentation"
    onClick={() => setOption()}
  >
    <p>{name}</p>
  </div>
);

export default CourierOptions;
