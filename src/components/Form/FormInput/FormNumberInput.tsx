import React from 'react';
import Button from '../../Button/Button';

type FormNumberInputProps = {
  formType: string,
  value: number;
  label: string;
  name: string;
  handleInput: (event: any) => void;
  setInput: () => void;
};

const FormNumberInput = (props: FormNumberInputProps) => {
  const {
    formType,
    value,
    label,
    name,
    handleInput,
    setInput,
  } = props;

  const handlePlus = () => {
    const event = {
      target: {
        value: value + 1,
      },
    };
    handleInput(event);
  };

  const handleMinus = () => {
    if (value > 0) {
      const event = {
        target: {
          value: value - 1,
        },
      };
      handleInput(event);
    }
  };

  return (
    <label htmlFor={name} className={formType}>
      {
        formType === 'amount-item-cart'
        && (
          <Button
            buttonType="circle"
            text="&minus;"
            handleClickedButton={handleMinus}
          />
        )
      }
      {
        formType === 'number currency'
        && (
          <div className="currency">
            Rp
          </div>
        )
      }
      <div className={`input_content number ${name}`}>
        <input
          type="number"
          placeholder={label}
          value={value}
          onChange={handleInput}
          onBlur={setInput}
          onFocus={setInput}
          name={name}
          id={name}
          min="0"
          className={`input ${name}`}
        />
      </div>
      {
        formType === 'amount-item-cart'
        && (
          <Button
            buttonType="circle"
            text="&#43;"
            handleClickedButton={handlePlus}
          />
        )
      }
    </label>
  );
};

export default FormNumberInput;
