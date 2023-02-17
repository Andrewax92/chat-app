import './Login.css'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { Link} from 'react-router-dom'

const Login = () => {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  const {loginError,login,isPending} = useLogin()
  console.log(loginError);

  const handleSubmit =  async (e) =>{
    e.preventDefault()
     await login(email,password);
    if(loginError){
      setEmail("")
      setPassword("")
    }
  }




  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ax-Chat_App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" onChange = {(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" onChange = {(e) => setPassword(e.target.value)} />
          {!isPending && <button className="btn"> Sign in</button>}
         {isPending && <button className="btn" disabled>loading</button>}
         {loginError &&  <div className="error">{loginError}</div>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}
//   return (
//       <form className = "auth-form" onSubmit={handleSubmit}>
//          <label>
//            <span>email:</span>
//            <input type="email"
//            value={email}
//            required
//            onChange = {(e) => setEmail(e.target.value)} />
//          </label>
//          <label>
//            <span>password:</span>
//            <input type="password"
//            required
//            value={password}
//            onChange = {(e) => setPassword(e.target.value)} />
//          </label>
//          {!isPending && <button className="btn"> Sign in</button>}
//          {isPending && <button className="btn" disabled>loading</button>}
//          {loginError &&  <div className="error">{loginError}</div>}
//       </form>
//     )
// }

export default Login
