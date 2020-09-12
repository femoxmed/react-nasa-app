import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  classes?: string;
  title?: string;
  disabled?: boolean;
  ClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customRef?: any;
};

const Button: React.FC<ButtonProps> = ({
  children,
  classes,
  disabled,
  title,
  ClickHandler,
  customRef,
}) => {
  classes = classes && classes.length > 0 ? 'button ' + classes : 'button';
  return (
    <button
      ref={customRef}
      disabled={disabled}
      onClick={ClickHandler}
      title={title}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
