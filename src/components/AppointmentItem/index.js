// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {name, date, id, isActive} = appointmentDetails

  const starImgUrl = isActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{name}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <div>
        <p className="date">Date: {date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
