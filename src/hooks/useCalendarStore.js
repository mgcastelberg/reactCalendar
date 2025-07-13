import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    // const setActiveEvent = ( calendarEvent ) => {
    //     dispatch( onSetActiveEvent( calendarEvent ) )
    // }
    
    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent({
            ...calendarEvent,
            start: calendarEvent.start.toISOString(),
            end: calendarEvent.end.toISOString()
        }))
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend
        // TODO: bien
        if ( calendarEvent.id ) {
            // Actualizar
            // TODO: llegar al backend
            dispatch( onUpdateEvent({ 
                    ...calendarEvent,
                    start: calendarEvent.start.toISOString(),
                    end: calendarEvent.end.toISOString()
                }) );
        } else {
            // Crear
            // TODO: llegar al backend
            // Creamos un id ficticio simulando un id que llega del backend
            dispatch( onAddNewEvent({ 
                    ...calendarEvent, 
                    id: new Date().getTime(),
                    start: calendarEvent.start.toISOString(),
                    end: calendarEvent.end.toISOString()
                })
            );
        }

    }

    const startDeletingEvent = () => {
        // Todo: Llegar al backend
        dispatch( onDeleteEvent() );
    }    

    return {
        //* Properties
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent
    }
}
