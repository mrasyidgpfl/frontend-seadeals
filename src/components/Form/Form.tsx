import React from 'react';
import FormSubmit from './FormSubmit';
import FormItem from './FormItem';

import './Form.scss';

type FormRequiredProps = {
  formType: string;
  items: any[];
  values: any;
  handleInput: (event: any) => void;
};

type FormOptionalProps = {
  // eslint-disable-next-line react/require-default-props
  handleSubmitButton?: () => void;
  setInput?: any;
  haveSubmitButton?: boolean;
  readOnly?: boolean;
};

interface FormProps
  extends FormRequiredProps,
  FormOptionalProps {}

const defaultProps: FormOptionalProps = {
  setInput: (e: any) => e,
  haveSubmitButton: false,
  readOnly: false,
};

const Form = (props: FormProps) => {
  const {
    formType,
    items,
    values,
    handleInput,
    handleSubmitButton,
    haveSubmitButton,
    setInput,
    readOnly,
  } = props;

  const handleButton = () => {
    if (handleSubmitButton) {
      handleSubmitButton();
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (handleSubmitButton) {
      handleSubmitButton();
    }
  };

  return (
    <form
      className={`form ${formType}`}
      onSubmit={handleSubmit}
    >
      {
        items.map(
          (item) => (
            <FormItem
              key={`${formType}-${item.name}`}
              formType={formType}
              inputType={item.inputType}
              value={values[item.name]}
              label={item.label}
              name={item.name}
              options={item.options}
              handleInput={handleInput}
              handleButton={handleButton}
              setInput={setInput}
              readOnly={readOnly}
            />
          ),
        )
      }
      {
        haveSubmitButton
        && (
          <FormSubmit />
        )
      }
    </form>
  );
};

Form.defaultProps = defaultProps;

export default Form;
