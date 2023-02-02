
import { useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { Timestamp } from 'firebase/firestore'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useFireStore } from '../../hooks/useFireStore'
import { useNavigate } from 'react-router'
import './Create.css'

const categories = [
  {value: 'development', label:'Development'},
  {value: 'design', label:'Design'},
  {value: 'sales', label:'Sales'},
  {value: 'marketing', label:'Marketing'},
]

const Create = () => {
  const[name,setName] = useState('')
  const[details,setDetails] = useState('')
  const[dueDate,setDueDate] = useState('')
  const[category,setCategory] = useState('')
  const[assignedUsers,setAssignedUsers] = useState([])
  const[formError,setFormError] = useState(null)

  const {documents} = useCollection('users')
  const {user} = useAuthContext()
  const {addDocument,state} = useFireStore('projects')
  const navigate = useNavigate()

  // const [users,setUsers] = useState([])


 
  const handleSubmit =   async(e) => {
          
    e.preventDefault()
    setFormError(null)
    if(!category){
      setFormError("Please select a project category")
      return
    }
    if(assignedUsers.length < 1){
      setFormError("Pleae assign the project to at least 1 user")
    }
    console.log(assignedUsers);
    const createdBy = {
       displayName : user.displayName,
       photoURL: user.photoURL,
       id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u) => {
         
          return{
            displayName: u.displayName,
            photoURL: u.photoURL,
            id:u.id
          }
    })

    const project = {
      name,
      details,
      category,
      category,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList

    }

     await addDocument(project)
     if(!state.error){
        navigate('/')
     }
  }
  return (
    <div className="create-form">
      <h2 className="page-title">Create your own Project </h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input 
          type="text" 
          required
          onChange ={(e) => setName(e.target.value)}
          value={name}/>
        </label>

        <label>
          <span>Project details:</span>
          <textarea 
          type="text" 
          required
          onChange ={(e) => setDetails(e.target.value)}
          value={details}/>
        </label>

         <label>
          <span>Set due date:</span>
          <input 
          type="date" 
          required
          onChange ={(e) => setDueDate(e.target.value)}
          value={dueDate}/>
        </label>
     

        <label>

          <span>Project category</span>
          <Select 
        onChange={(option) => setCategory(option.value)}
        options = {categories}
        />
        </label>

        <label>
          <span>Assign to :</span>
           <Select 
           onChange = {(option) => setAssignedUsers(option)}
           options={documents}
           getOptionLabel={(option) => option.displayName}
           getOptionValue = {(option) => option}
           isMulti
           />
        </label>
      

        

        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create
