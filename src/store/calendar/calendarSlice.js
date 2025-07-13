import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvents = [
    {
        id: 1,
        title: 'Big Meeting2',
        notes: 'Call with client',
        allDay: false,
        start:addHours(new Date(), 2).toISOString(), //new Date(2022, 6, 0),
        end: addHours(new Date(), 3).toISOString(), // le sumamos 2 horas
        baColor: 'red',
        user: {
        _id: '123',
        name: 'Manuel'
        }
    },
    {
        id: 2,
        title: 'Cumpleaños del jefe',
        notes: 'Hay que comprar el pastel',
        allDay: false,
        start:addHours(new Date(), 4).toISOString(), //new Date(2022, 6, 0),
        end: addHours(new Date(), 5).toISOString(), // le sumamos 2 horas
        baColor: 'red',
        user: {
        _id: '123',
        name: 'Manuel'
        }
    }
]

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: tempEvents,
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }
                return event;
            } )
        },
    },
});

// Action creators are generated for each case reducer function Action Creators Function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;