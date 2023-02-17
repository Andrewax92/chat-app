import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom'
import {HiArrowRightCircle} from 'react-icons/hi2'
import './Sidebar.css'

const ProjectsAssigned = ({data}) => {
    // document.assignedProjects.sort((a,b)  =>  b.assignedDate - a.assignedDate)
  return (
    <div>
       { data && data.map((p) => (
           <ul key={p.id}>
         
               <Link to={`/project/${p.id}`}>
                 <span> <HiArrowRightCircle /></span> 
                   {p.name}
                   <p>{formatDistanceToNow(p.createdAt.toDate(),{addSuffix:true})}</p>
               </Link>
                
           </ul>
       ))}
    </div>
  )
}

export default ProjectsAssigned
