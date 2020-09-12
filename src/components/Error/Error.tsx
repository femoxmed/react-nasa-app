import React from 'react';
import ErrorSvg from './error_400.svg';

type NoResultProps = {
  errorMessage?: string;
  onClick?: () => void;
  actionTitle?: string;
};

const Error: React.FC<NoResultProps> = ({
  errorMessage,
  onClick,
  actionTitle,
}) => {
  return (
    <div className='container center-items'>
      <h3>{errorMessage || 'Opps something went wrong :('}</h3>

      <div>
        <img src={ErrorSvg} alt='No Result' width='300' height='300' />
      </div>

      <div onClick={onClick}>
        <button className='button'>
          {actionTitle || 'Go Back'}
          {/* <ArrowPrev /> Go Back */}
        </button>
      </div>
    </div>
  );
};

export default Error;
