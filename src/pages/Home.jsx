import React from 'react'

const Home = ({setProgress}) => {


  React.useEffect(() => {
    // document.title = `Dashboard | SuperTech Institute of Computer Sciences`;
    setProgress(20)
    setTimeout(() => {

      setProgress(100)
    }, 400);
  }, [])

  return (
    <div>
      home
    </div>
  )
}

export default Home
