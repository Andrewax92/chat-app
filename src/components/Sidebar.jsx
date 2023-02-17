import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import {HiOutlineFolderAdd} from 'react-icons/hi'
import{MdOutlineDashboardCustomize} from 'react-icons/md'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
import  useDocuments from '../hooks/useDocuments'
import NotificationBell from './NotificationBell'
import ProjectsAssigned from './ProjectsAssigned'
import { doc, updateDoc} from "firebase/firestore"
import { db } from '../firebase/config'
import {useCollection} from '../hooks/useCollection'



const Sidebar = () => {

    const {user} = useAuthContext()
    const {documents:projectsData} = useCollection('projects', ['assignedUsersId',"array-contains", `${user.uid}` ],["createdAt","desc"])
    console.log(projectsData);
  
    // const arrayIncludes = projectsData.assignedUsersId.includes(`${user.uid}`)
    // console.log(arrayIncludes);
    const {document} = useDocuments('users',user.uid)
    // if(document){
    //   console.log(document.displayName,document.online,document.assignedProjects)
    // }
    //  console.log(document.assignedProjects.sort( (a,b)  =>  b.assignedDate - a.assignedDate))
    const handleClick = async() => {

      const docRef = doc(db,"users",user.uid)
      await updateDoc(docRef,{
        projectsAssignedTotal:0 ,
    })
  
    }
    
  


  return (
    <div className='sidebar'>
      <div className="sidebar-content">
         <div className="user">
          {document && document.projectsAssignedTotal > 0  &&  <NotificationBell  assignedProjects={document.projectsAssignedTotal} handleClick={handleClick}/>}
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

            <div className="assignedProjects">
                <h3>Assigned Projects : </h3>
                { projectsData ?
  
                   <ProjectsAssigned data={projectsData}/> 
                  : 
                  
                  <p>"No projects assigned Yet"</p>}

            </div>

        </div>

    </div>
 
  )
}

export default Sidebar
