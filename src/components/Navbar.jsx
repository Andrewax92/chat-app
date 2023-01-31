import './Navbar.css'
import Logo from '../assets/2.jpg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

  const {logout} = useLogout()
  const{user} = useAuthContext()
  return (
    <div className='navbar'>
      <ul>
          <li className="logo">
             {user && <img src={Logo} alt="logo" /> }
              <span>Ax-Chat_App</span>
          </li>

          {  !user  ? <>
          <li>  <Link to="/login">Login</Link></li>
          <li> <Link to="/signup">Signup</Link></li>
          </>

          : 

         <li>
             <button className="btn" onClick={logout}>Logout</button>
         </li>
         }
      </ul>
    </div>
  )
}

export default Navbar
