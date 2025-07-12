import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getMessagesES, localizer } from '../../helpers'
import { Navbarx , CalendarEvent, CalendarModal, FabAddNew } from '../'
import { useCalendarStore, useUiStore } from '../../hooks'

// const events = [
//   {
//     title: 'Big Meeting',
//     allDay: false,
//     start:addHours(new Date(), 2), //new Date(2022, 6, 0),
//     end: addHours(new Date(), 3), // le sumamos 2 horas
//     baColor: 'red',
//     user: {
//       _id: '123',
//       name: 'Manuel'
//     }
//   },
//   {
//     title: 'Lunch',
//     start: addDays(new Date(), 1), // new Date(),
//     end: addDays(new Date(), 1),
//     allDay: false,
//     resizable: {
//       beforeStart: true,
//       afterEnd: true,
//     },
//     user: {
//       _id: '123',
//       name: 'Fernando'
//     }
//   },
// ]

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const parsedEvents = events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
  }));

  const eventStyleGetter = (event, start, end, isSelected) =>{
    // console.log({event, start, end, isSelected});
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '7px',
      opacity: 0.8,
      color: 'white'
    };
    return {  
      style
    }
  } 

  const onDoubleClick = (e) => {
    // console.log({doubleClick: e});
    openDateModal();
  }

  const onSelect = (e) => {
    console.log({click: e});
    setActiveEvent(e);
  }

  const onViewChange = (e) => {
    console.log({viewChanged:e});
    localStorage.setItem('lastView', e);
    setLastView(e);
  }
  
  return (
    <>
      <Navbarx />
      <Calendar
        culture='es'
        localizer={localizer}
        events={parsedEvents}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />                                                                                                             
      <FabAddNew />
    </>  
  )
}
