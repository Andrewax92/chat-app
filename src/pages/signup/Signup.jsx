import { useState } from 'react'
import './Signup.css'
import { useSignup } from '../../hooks/useSignup'

const Signup = () => {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[displayName,setDisplayName] = useState('')
  const[thumbnail,setThumbnail] = useState(null)
  const[thumbnailError,setThumbnailError] = useState(null)

  const {error,isPending,signup} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email,password,displayName,thumbnail)
    console.log(email);
    console.log(password);
    console.log(displayName);
    console.log(thumbnail);


  }


  const handleFileChange = (e) => {
     setThumbnail(null)

     let selected = e.target.files[0]

     if(!selected){ 
      setThumbnailError('Please select a file')
      return
     }

     if(!selected.type.includes('image')){
       setThumbnailError('Selected file must be an Image')
       return
     }
    if(selected.size > 100000){
      setThumbnailError("Image file size must be less then 100kb")
      return
    }
    
    setThumbnailError(null)

    setThumbnail(selected)
    console.log("thumbnail updated");

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
       <label>
         <span>display name:</span>
         <input type="text"
         value={displayName}
         required
         onChange = {(e) => setDisplayName(e.target.value)} />
       </label>
       <label>
         <span>profile thumbnail:</span>
         <input type="file"
         required
         onChange={handleFileChange}
          />
          {thumbnailError && <div className="error"> {thumbnailError}</div>}
       </label>
       {!isPending && <button className="btn"> Sign up</button>}
       {isPending && <button className="btn" disabled>loading</button>}
       {error&& <div className="error">{error}</div>}
    </form>
  )
}

export default Signup
