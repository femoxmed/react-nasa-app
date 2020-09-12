import React from 'react';
import Backdrop from './Backdrop';


export enum Sizes{
    Small = 'small',
    Large ='large'
}
type NoResultProps = {

    showModal?: boolean;
    children: any;
    closeModal?: () => void;
    variant?: string
  
  };
  
  const Modal: React.FC<NoResultProps> = ({showModal, closeModal, children , variant}) => {
  
    return (
        <>
        <Backdrop show={showModal}  closeBackdrop={closeModal}/>
        <div className={`Modal ${variant}` }
        style={{
            transform:showModal ? 'translateY(0)' : 'translateY(-1000vh)',
            opacity :showModal ? 1 : 0
        }}
    >
            {children}
        </div>
        </>
    );
};


export default Modal;