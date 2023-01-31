import './Login.css'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const {error,isPending,login} = useLogin()

  const handleSubmit = (e) =>{
    e.preventDefault()
    login(email,password);
  }
  return (
      <form className = "auth-form" onSubmit={handleSubmit}>
         <label>
           <span>email:</span>
           <input type="email"
           value={email}
           required
           onChange = {(e) => setEmail(e.target.value)} />
         </label>
         <label>
           <span>password:</span>
           <input type="password"
           required
           value={password}
           onChange = {(e) => setPassword(e.target.value)} />
         </label>
         {!isPending && <button className="btn"> Sign up</button>}
         {isPending && <button className="btn" disabled>loading</button>}
         {error&& <div className="error">{error}</div>}
      </form>
    )
}

export default Login