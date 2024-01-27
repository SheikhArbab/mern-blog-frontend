import React from 'react'

const Projects = ({setProgress}) => {


  React.useEffect(() => {
    // document.title = `Dashboard | SuperTech Institute of Computer Sciences`;
    setProgress(20)
    setTimeout(() => {

      setProgress(100)
    }, 400);
  }, [])
  return (
    <div>
      Projects
    </div>
  )
}

export default Projects
