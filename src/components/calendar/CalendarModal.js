import React, { useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';



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


const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

export const CalendarModal = () => {
  
    //para usar algo del store de redux
    const { modalOpen } = useSelector(state => state.ui)

    //para ejecutar algo del store de redux
    const dispatch = useDispatch();

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [ titleValid, setTitleValid ] = useState(true);

    const [ formValues, setFormValues] = useState({
      title: 'Evento 1',
      notes: '',
      start: now.toDate(),
      end: nowPlus1.toDate()
    })

    const { notes, title, start, end } = formValues;

    const handleInputChange = ({ target }) => {
      setFormValues( {
        ...formValues,
        [target.name] : target.value
      })
    }


    const closeModal = () => {
        //console.log('cerrando modal');

        //ejecutamos la accion que viene del uiReducer
        dispatch( uiCloseModal() );
    }

    const handleStartDateChange = (e) => {
      //console.log(e);
      setDateStart(e);
      setFormValues({
        ...formValues,
        start: e
      })
    }

    const handleEndDateChange = (e) => {
      //console.log(e);
      setDateEnd(e);
      setFormValues({
        ...formValues,
        end: e
      })
      
    }

    
    //enviar el formulario
    const handleSubmitForm = (e) => {
        e.preventDefault();
       // console.log( formValues )
       const momentStart = moment( start );
       const momentEnd = moment( end );
       //console.log(momentStart);
       //console.log(momentEnd);

       if ( momentStart.isSameOrAfter( momentEnd )) {
         return Swal.fire('Error', 'La fecha de fin debe de ser mayor a la fecha de inicio', 'error');
       }

       if ( title.trim().length < 2) {
         return setTitleValid(false);
       }

       //TODO: realizar grabacion en bd

       setTitleValid(true);
       closeModal();


    }

    return (
        <Modal
          isOpen={ modalOpen }
          //onAfterOpen={afterOpenModal}
          onRequestClose={ closeModal }
          closeTimeoutMS={ 200 }
          style={customStyles}
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
                <hr />
                <form 
                    className="container"
                    onSubmit={ handleSubmitForm }

                    >

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={ handleStartDateChange }
                            value={ dateStart }
                            className="form-control"
                          />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={ handleEndDateChange }
                            value={ dateEnd }
                            className="form-control"
                            minDate={ dateStart }
                          />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input 
                            type="text" 
                            className={` form-control ${ !titleValid && 'is-invalid' }`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={ title }
                            onChange={ handleInputChange }
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea 
                            type="text" 
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={ notes }
                            onChange={ handleInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
        </Modal>
    )
}
