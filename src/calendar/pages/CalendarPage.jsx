import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import { NavBar } from '../'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from '../../helpers'


const events = [{
  title: 'Nuevo titulo',
  notes: 'Estas son las notas',
  start: new Date(),
  end: addHours(new Date(), 0.2), 
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando',
  },

}]


export const CalendarPage = () => {
  return (
    <>
      <NavBar />

      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          culture='es'
          messages={ getMessagesES() }          
        />
      </div>
    </>
  )
}
