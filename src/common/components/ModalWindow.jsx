import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import propTypes from 'prop-types';

const ModalWindow = (props) => {
    const {title, isOpen, onClose, children} = props;

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>
            
        </Modal>
    )
};

ModalWindow.propTypes = {
    title: propTypes.string,
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    children: propTypes.elementType
};

export default ModalWindow;