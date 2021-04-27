import React, { useState } from 'react'
import Modal from 'react-modal';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [ isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        //console.log('cerrando modal');
        setIsOpen(false);
    }
    return (
        <Modal
          isOpen={ isOpen }
          //onAfterOpen={afterOpenModal}
          onRequestClose={ closeModal }
          closeTimeoutMS={ 200 }
          style={customStyles}
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1>Ventana Modal</h1>
            <hr/>
            <span>Probando el componente modal</span>
        </Modal>
    )
}
