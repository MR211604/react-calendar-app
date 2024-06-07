import { useSelector, useDispatch } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector(state => state.calendar)


  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    //TODO: llegar al backend

    //Esto significa que estoy actualizando un evento 
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }

  const startDeletingEvent = async () => {
    
    //Todo: llegar al backend
    dispatch(onDeleteEvent())
  }

  return {

    events,
    activeEvent,
    hasEventSelected: !!activeEvent?._id,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent

  }

}
