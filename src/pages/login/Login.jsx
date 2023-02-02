import './Login.css'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

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
         {!isPending && <button className="btn"> Sign in</button>}
         {isPending && <button className="btn" disabled>loading</button>}
         {loginError &&  <div className="error">{loginError}</div>}
      </form>
    )
}

export default Login
