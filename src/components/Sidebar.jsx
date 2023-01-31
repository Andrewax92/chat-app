import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import {HiOutlineFolderAdd} from 'react-icons/hi'
import{MdOutlineDashboardCustomize} from 'react-icons/md'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

const Sidebar = () => {

    const {user} = useAuthContext()
  return (
    <div className='sidebar'>
        <div className="sidebar-content">
            <div className="user">
           {user &&  <Avatar src={user.photoURL} />}  
             { user &&  <p> Hey {user.displayName}</p>}
            </div>
            <nav className="links">
                <ul>
                    <li>
                         <NavLink to='/'>
                             < MdOutlineDashboardCustomize  />
                             <span>Dashboard</span>
                         </NavLink>
                    </li>
                    <li>
                         <NavLink to='/create'>
                           <HiOutlineFolderAdd />
                             <span>New Project</span>
                         </NavLink>
                    </li>
                </ul>
            </nav>
        </div>

    </div>
  )
}

export default Sidebar
