import classes from './Modal.module.css'
import React from 'react';
import { createPortal } from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClick}></div>
}

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

const Modal = props => {

    const overlayEl = document.getElementById('overlay')
    
    return <>
        {createPortal(<Backdrop onClick={props.onClose}/>,overlayEl)}
        {createPortal(<ModalOverlay>{props.children}</ModalOverlay>,overlayEl)}
    </>
}

export default Modal;