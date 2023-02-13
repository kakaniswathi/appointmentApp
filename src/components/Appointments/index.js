// Write your code here

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {nameInput: '', dateInput: '', appointmentLists: [], isActive: false}

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentLists: prevState.appointmentLists.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isActive: !eachAppointment.isActive}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isActive} = this.state

    this.setState({
      isActive: !isActive,
    })
  }

  getFilteredList = () => {
    const {appointmentLists, isActive} = this.state
    if (isActive) {
      return appointmentLists.filter(eachItem => eachItem.isActive === true)
    }
    return appointmentLists
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const dateFormat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4,
      name: nameInput,
      date: dateFormat,
      isActive: false,
    }
    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, newAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {nameInput, dateInput, isActive} = this.state
    const filterClassName = isActive ? 'filter-filled' : 'filter-empty'
    const filteredList = this.getFilteredList()
    return (
      <div className="bg-color">
        <div className="white-card">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  placeholder="Title"
                  value={nameInput}
                  onChange={this.onChangeName}
                  className="input"
                  type="text"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDate}
                  className="input"
                />
                <button type="submit" className="add-button">
                  {' '}
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr className="line" />

          <div className="heading-button">
            <h1 className="appointments-heading"> Appointments</h1>
            <button
              type="button"
              onClick={this.onFilter}
              className={`filter-style ${filterClassName}`}
            >
              Starred
            </button>
          </div>

          <ul className="appoinment-list">
            {filteredList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
