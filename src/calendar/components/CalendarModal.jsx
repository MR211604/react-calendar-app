import { addHours, differenceInSeconds } from "date-fns";
import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal"
import "../../react-calendar.css";
import Swal from "sweetalert2";
import { useCalendarStore, useUiStore } from "../../hooks";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: "Titulo",
    notes: 'Notas',
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid'

  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])

  // funcion para manejar el cambio de los inputs
  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    closeDateModal()
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setFormSubmitted(true)
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference < 0) {
      Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error')
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues)
    closeDateModal()
    setFormSubmitted(false)

  }

  return (
    <>
      <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>

          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={formValues.start}
              onChange={(e) => onDateChange(e, 'start')}
              className="form-control"

              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(e) => onDateChange(e, 'end')}
              className="form-control"

              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>

        </form>
      </Modal>

    </>
  )
}
