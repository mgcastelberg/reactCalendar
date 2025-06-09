import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { Navbarx } from "../components/Navbarx"
import { addHours, format, parse, startOfWeek, getDay, addDays, add } from 'date-fns'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(), //new Date(2022, 6, 0),
    end: addHours(new Date(), 2), // le sumamos 2 horas
    baColor: 'red',
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
  },
]

export const CalendarPage = () => {
  return (
    <>
      <Navbarx />
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
    />
    </>
  )
}
