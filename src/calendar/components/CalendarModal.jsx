import { useEffect, useMemo, useState } from 'react'
import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal'
import DatePicker, {registerLocale}  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useCalendarStore, useUiStore } from '../../hooks';


registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px'
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent } =  useCalendarStore();
    // console.log(isDateModalOpen);
    // const [isOpen, setIsOpen] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Manuel',
        notes: 'Gómez',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) { return ''; }

        return formValues.title.length > 0
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted]);

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({
                ...activeEvent, 
                start: new Date(activeEvent.start),
                end: new Date(activeEvent.end),
            }); // Creamos un nuevo objeto
        }
    }, [activeEvent]);

    const [startDate, setStartDate] = useState(new Date());

    const onInputChanged = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    }

    const onCloseModal = () => {
        console.log('cerrar modal');
        closeDateModal();
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const difference =differenceInSeconds(formValues.end, formValues.start);
        // console.log(difference);
        
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }
        
        if (formValues.title.trim().length <= 0) {
            // alert('El título es obligatorio');
            return;
        }
        // console.log(formValues);

        // TODO: Llamar la accion
        // remover errores
        // onCloseModal();
    }

    return (
        <Modal 
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            overlayClassName={'modal-fondo'}
            closeTimeoutMS={500}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label><br/>
                    <DatePicker
                        className="form-control"
                        selected={ formValues.start }
                        onChange={ (event) => onDateChanged(event, 'start') }
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={ formValues.start }
                        className="form-control"
                        selected={ formValues.end }
                        onChange={ (event) => onDateChanged(event, 'end') }
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />

                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${titleClass}` }
                        placeholder="Título del evento"
                        name="title"
                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
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
