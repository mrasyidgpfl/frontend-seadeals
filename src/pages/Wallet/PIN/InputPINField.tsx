import React, {
  FC, useEffect, useRef, useState,
} from 'react';

const InputPINField:FC<any> = ({ PIN, setPIN }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>, index:number):void => {
    const { value } = target;
    if (value !== '' && Number.isNaN(parseInt(value, 10))) {
      return;
    }
    const newPIN = [...PIN];
    newPIN[index] = value;
    setPIN(newPIN);
    if (!value || activeIdx >= 5) {
      return;
    }
    setActiveIdx(index + 1);
  };

  const handleOnKeyDown = (e:any, index:number):void => {
    if (e.key === 'Backspace' && activeIdx > 0 && !e.target.value) {
      setActiveIdx(index - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeIdx]);

  return (
    <div className="d-flex justify-content-center gap-1 pin-input pb-3">
      {PIN.map((_:any, idx:any) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={idx}>
          <input
            ref={idx === activeIdx ? inputRef : null}
            type="password"
            maxLength={1}
            minLength={1}
            className="form-control px-0 text-center fs-5 fw-bold bg-light"
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleOnKeyDown(e, idx)}
            onFocus={() => setActiveIdx(idx)}
            value={PIN[idx]}
          />
          {idx === PIN.length - 1 ? null : (
            <span className="w-2 py-0.5 bg-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default InputPINField;
