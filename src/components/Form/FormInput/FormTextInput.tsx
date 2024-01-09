import React from 'react';
import Button from '../../Button/Button';
import { ReactComponent as IconSearch } from '../../../assets/svg/icon_search.svg';

type FormTextInputProps = {
  value: string;
  label: string;
  name: string;
  handleInput: (event: any) => void;
  handleButton: () => void;
};

const FormTextInput = (props: FormTextInputProps) => {
  const {
    value,
    label,
    name,
    handleInput,
    handleButton,
  } = props;

  return (
    <label htmlFor={name}>
      <div className={`input_content text ${name}`}>
        <input
          type="text"
          placeholder={label}
          value={value}
          onChange={handleInput}
          name={name}
          id={name}
          className={`input ${name}`}
        />
        {
          name === 'searchInput'
          && (
            <Button
              buttonType="primary search"
              iconUrl={IconSearch}
              iconName="search"
              handleClickedButton={handleButton}
            />
          )
        }
      </div>
    </label>
  );
};

export default FormTextInput;
