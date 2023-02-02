import useDocuments from '../../hooks/useDocuments'
import { useParams } from 'react-router'
import './Project.css'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'


const Project = () => {

  const{id} = useParams()

  const{document,error} = useDocuments('projects',id)

  if(error){
    return <div className="error">{error}</div>
  }
  if(!document){
    return <div className="loading">Loading</div>
  }

  return (
    <div className="project-details">
      <ProjectSummary  project={document}/>
      <ProjectComments project={document} />
    </div>
  )
}

export default Project
