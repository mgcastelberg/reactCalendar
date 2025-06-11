import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours, addDays } from 'date-fns'
import { getMessagesES, localizer } from '../../helpers'
import { Navbarx , CalendarEvent } from '../'

const events = [
  {
    title: 'Big Meeting',
    allDay: false,
    start:addHours(new Date(), 2), //new Date(2022, 6, 0),
    end: addHours(new Date(), 3), // le sumamos 2 horas
    baColor: 'red',
    user: {
      _id: '123',
      name: 'Manuel'
    }
  },
  {
    title: 'Lunch',
    start: addDays(new Date(), 1), // new Date(),
    end: addDays(new Date(), 1),
    allDay: false,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    user: {
      _id: '123',
      name: 'Fernando'
    }
  },
]

export const CalendarPage = () => {

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
  
  return (
    <>
      <Navbarx />
      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
    />
    </>
  )
}
