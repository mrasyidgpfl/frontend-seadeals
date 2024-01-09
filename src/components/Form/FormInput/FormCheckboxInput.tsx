import React from 'react';

type FormCheckboxInputProps = {
  // value: string;
  // label: string;
  name: string;
  options: any[];
  handleInput: (event: any) => void;
};

const FormCheckboxInput = (props: FormCheckboxInputProps) => {
  const {
    // value,
    // label,
    name,
    options,
    handleInput,
  } = props;

  return (
    <div className={`input_content checkbox ${name}`}>
      {
        options.map(
          (item) => (
            <label
              key={`${item.id}-${item.name}`}
              htmlFor={item.name}
              className="option"
            >
              <input
                type="checkbox"
                value={item.name}
                onChange={handleInput}
                name={item.name}
                id={item.name}
                className={`input ${item.name}`}
              />
              <span>{ item.name }</span>
            </label>
          ),
        )
      }
    </div>
  );
};

export default FormCheckboxInput;
