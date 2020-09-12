import React from 'react';


const Backdrop = (props:any) => (
    props.show ? <div className='Backdrop' onClick={props.closeBackdrop}></div> : null
)

export default Backdrop