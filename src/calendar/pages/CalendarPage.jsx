import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from '../'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'
import { useUiStore, useCalendarStore } from '../../hooks'


export const CalendarPage = () => {
  
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  
  const onDoubleClick = (e) => {
    openDateModal()
  }

  const onSelect = (e) => {
    setActiveEvent(e)
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e) // Guardar en el localStorage
    setLastView(e)
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
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
