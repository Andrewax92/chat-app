
const filterList = ["all","mine","development","design","marketing"]



const ProjectFilter = ({currentFilter,handleFilter}) => {
  
    const handleClick = (newFilter) => {
       handleFilter(newFilter)
       console.log(newFilter);
    }
  return (
    <div className="project-filter">
      <nav>
          {filterList.map((f) => (
            <button 
            onClick={() => handleClick(f)}
            key={f}
            className = {currentFilter === f ? 'active': ''}>
                {f}
            </button>
          ))}
      </nav>
    </div>
  )
}

export default ProjectFilter
