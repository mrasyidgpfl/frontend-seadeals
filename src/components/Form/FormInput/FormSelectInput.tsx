import React from 'react';

type FormSelectInputProps = {
  value: string;
  label: string;
  name: string;
  options: any[];
  handleInput: (event: any) => void;
};

const FormSelectInput = (props: FormSelectInputProps) => {
  const {
    value,
    label,
    name,
    options,
    handleInput,
  } = props;

  return (
    <label htmlFor={name}>
      <div className="input_content select">
        <select
          value={value}
          name={name}
          id={name}
          onChange={handleInput}
          className={`select ${name}`}
        >
          <option value="0">
            {`Pilih ${label}...`}
          </option>
          {
            options?.map(
              (item) => (
                <option
                  key={`${item.name}-${item.id}`}
                  value={item.name}
                  className={`option ${item.name}`}
                >
                  {item.name}
                </option>
              ),
            )
          }
        </select>
      </div>
    </label>
  );
};

export default FormSelectInput;
