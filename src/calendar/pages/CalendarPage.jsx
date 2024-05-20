import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import { CalendarEvent, NavBar } from '../'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'


const events = [{
  title: 'Nuevo titulo',
  notes: 'Estas son las notas',
  start: new Date(),
  end: addHours(new Date(), 2), 
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando',
  },

}]


export const CalendarPage = () => {
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  
  const onDoubleClick = (e) => {
  
  }

  const onSelect = (e) => {

  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e) // Guardar en el localStorage
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }
    return {
      style
    }
  }
  
  return (
    <>
      <NavBar />

      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={lastView}
          style={{ height: 500 }}
          culture='es'
          messages={ getMessagesES() }  
          eventPropGetter={ eventStyleGetter } 
          components={{
            event: CalendarEvent
          }}       
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChange }
        />
      </div>
    </>
  )
}
