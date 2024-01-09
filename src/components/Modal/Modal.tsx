import React, { useEffect, useState } from 'react';
import './Modal.scss';
import Button from '../Button/Button';

type ModalRequiredProps = {
  modalType: string;
  // data: any;
  // accept: () => void;
  isOpen: boolean,
  cancel: () => void,
  children: any,
};

type ModalOptionalProps = {
  isHaveCloseButton?: boolean,
};

interface ModalProps
  extends ModalRequiredProps,
  ModalOptionalProps {}

const defaultProps: ModalOptionalProps = {
  isHaveCloseButton: false,
};

const Modal = (props: ModalProps) => {
  const {
    modalType,
    cancel,
    isHaveCloseButton,
    isOpen,
    children,
  } = props;

  const [open, setOpen] = useState(isOpen);

  const handleCancel = () => {
    setOpen(!open);
    cancel();
  };

  useEffect(() => {
    setOpen(isOpen);
    if (!isOpen) {
      cancel();
    }
  }, [isOpen]);

  return (
    <div
      className={`modal_container ${modalType} ${open ? 'open' : 'close'}`}
      onClick={handleCancel}
      role="presentation"
    >
      <div
        className={`modal_content ${open ? 'open' : 'close'}`}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        {
          isHaveCloseButton
          && (
            <div className="close_button">
              <Button
                buttonType="secondary alt"
                text="X"
                handleClickedButton={handleCancel}
              />
            </div>
          )
        }
        {
          children
        }
      </div>
    </div>
  );
};

Modal.defaultProps = defaultProps;

export default Modal;
