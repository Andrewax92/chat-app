import { useState } from 'react'
import './Signup.css'
import { useSignup } from '../../hooks/useSignup'
import Add from '../../assets/addAvatar.png'
import { Link } from 'react-router-dom'

const Signup = () => {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[displayName,setDisplayName] = useState('')
  const[thumbnail,setThumbnail] = useState(null)
  const[thumbnailError,setThumbnailError] = useState(null)

  const {error,isPending,signup} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
   console.log(email,password,displayName,thumbnail)
    signup(email,password,displayName,thumbnail)
   


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
    if(selected.size >2*1024*1024){
      setThumbnailError("Image file size must be less then 100kb")
      return
    }
    
    setThumbnailError(null)

    setThumbnail(selected)
    console.log("thumbnail updated");

  }


  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ax_Chat</span>
        <span className="title">SignUp</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" onChange = {(e) => setDisplayName(e.target.value)} />
          <input required type="email" placeholder="email"  onChange = {(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder="password" onChange = {(e) => setPassword(e.target.value)} />
          <input required style={{ display: "none" }} type="file" id="file"  onChange={handleFileChange} />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          {thumbnailError && <div className="error"> {thumbnailError}</div>}
          <button disabled={isPending}>Sign up</button>
          {isPending && "Uploading and compressing the image please wait..."}
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}


//   return (
//     <form className = "auth-form" onSubmit={handleSubmit}>
//        <label>
//          <span>email:</span>
//          <input type="email"
//          value={email}
//          required
//          onChange = {(e) => setEmail(e.target.value)} />
//        </label>
//        <label>
//          <span>password:</span>
//          <input type="password"
//          required
//          value={password}
//          onChange = {(e) => setPassword(e.target.value)} />
//        </label>
//        <label>
//          <span>display name:</span>
//          <input type="text"
//          value={displayName}
//          required
//          onChange = {(e) => setDisplayName(e.target.value)} />
//        </label>
//        <label>
//          <span>profile thumbnail:</span>
//          <input type="file"
//          required
//          onChange={handleFileChange}
//           />
//           {thumbnailError && <div className="error"> {thumbnailError}</div>}
//        </label>
//        {!isPending && <button className="btn"> Sign up</button>}
//        {isPending && <button className="btn" disabled>loading</button>}
//        {error&& <div className="error">{error}</div>}
//     </form>
//   )
// }

export default Signup
