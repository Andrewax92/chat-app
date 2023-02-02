import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import "./ProjectList.css"


const ProjectList = ({data}) => {
  return (
    <div className="project-list">
     { data.length === 0 && <p>No projects yet</p>}
    {data.map(project => (
        <Link to={`/project/${project.id}`} key={project.id}>
        <h4>{project.name}</h4>
        <p>Due by {project.dueDate.toDate().toDateString()}</p>
        <div className="assined-to">
            <ul>
                {project.assignedUsersList.map(user => (
           
                <li key ={user.id}>
                        <Avatar src={user.photoURL} />
                </li>
            ))}
            </ul>
        </div>
       </Link>
    ))}
    </div>
  )
}

export default ProjectList
