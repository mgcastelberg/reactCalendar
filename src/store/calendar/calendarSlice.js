import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    title: 'Big Meeting',
    allDay: false,
    start:addHours(new Date(), 2), //new Date(2022, 6, 0),
    end: addHours(new Date(), 3), // le sumamos 2 horas
    baColor: 'red',
    user: {
      _id: '123',
      name: 'Manuel'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;