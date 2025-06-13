import { max, set } from 'date-fns';
import { tr } from 'date-fns/locale';
import React, { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px'
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);
    

    const onCloseModal = () => {
        console.log('cerrar modal');
        setIsOpen(false);
    }

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            overlayClassName={'modal-fondo'}
            closeTimeoutMS={500}
        >

            <h1>Modal</h1>
            <hr />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut quasi eveniet blanditiis dolorum iure eligendi pariatur quos repellendus, nesciunt asperiores similique, ipsum ad est culpa fugiat autem expedita animi id.</p>

        </Modal>
    )
}
