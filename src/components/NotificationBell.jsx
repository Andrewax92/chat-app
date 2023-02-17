import {BsBell} from 'react-icons/bs'

import './NotificationBell.css'

const NotificationBell = ({assignedProjects,handleClick}) => {

  return (
    <div className='notification-container' onClick={handleClick}>
      <div className="notification-container-items">
         <BsBell  className="notification-container_bell"/>
         <div className="notification-container-number">
               <p >{assignedProjects}</p>
         </div>
      </div>
    </div>
  )
}

export default NotificationBell
