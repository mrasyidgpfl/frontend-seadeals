import React, { useEffect } from 'react';
import FormTextInput from './FormInput/FormTextInput';
import FormSelectInput from './FormInput/FormSelectInput';
import FormCheckboxInput from './FormInput/FormCheckboxInput';
import FormNumberInput from './FormInput/FormNumberInput';

type FormItemProps = {
  formType: string,
  inputType: string;
  value: any,
  label: string;
  name: string;
  options: any;
  handleInput: (event: any) => void;
  readOnly: boolean | undefined;
  handleButton: () => void;
  setInput: () => void;
};

const FormItem = (props: FormItemProps) => {
  const {
    formType,
    inputType,
    value,
    label,
    name,
    options,
    handleInput,
    handleButton,
    setInput,
    readOnly,
  } = props;

  useEffect(() => {
    if (readOnly) {
      const element = document.getElementById(label);
      element?.setAttribute('readonly', '');
      element?.setAttribute('disabled', '');
    }
    if (!readOnly) {
      const element = document.getElementById(label);
      element?.removeAttribute('readonly');
      element?.removeAttribute('disabled');
    }
  }, [readOnly]);

  return (
    <div className="form_input">
      {
        inputType === 'text'
        && (
          <FormTextInput
            value={value}
            label={label}
            name={name}
            handleInput={handleInput}
            handleButton={handleButton}
          />
        )
      }
      {
        inputType === 'number'
        && (
          <FormNumberInput
            formType={formType}
            value={value}
            label={label}
            name={name}
            handleInput={handleInput}
            setInput={setInput}
          />
        )
      }
      {
        inputType === 'select'
        && (
          <FormSelectInput
            value={value}
            label={label}
            name={name}
            options={options}
            handleInput={handleInput}
          />
        )
      }
      {
        inputType === 'checkbox'
        && (
          <FormCheckboxInput
            // value={value}
            // label={label}
            name={name}
            options={options}
            handleInput={handleInput}
          />
        )
      }
      {
        name === 'minPrice'
        && (
          <hr />
        )
      }
    </div>
  );
};

export default FormItem;
