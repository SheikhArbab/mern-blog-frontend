import React from 'react'

const About = ({ setProgress }) => {


  React.useEffect(() => {
    setProgress(20)
    setTimeout(() => {

      setProgress(100)
    }, 400);
  }, [])
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About Arbab's Blog</h1>
          <div className='text-md text-gray-50 flex flex-col gap-6'>
            <p>Introducing Arbab's Blog, a space where I channel my passion for technology and software engineering into written form. As a software enthusiast, I use this platform to articulate my thoughts, experiences, and the valuable lessons I've acquired throughout my career. I invite you to join me on this digital journey, exploring the ever-evolving landscape of technology through my perspective.
            </p>
            <p>Arbab's Blog stands as a testament to my love for writing and the world of software engineering. Within these virtual pages, I share my personal insights, experiences, and the continual process of learning that comes with being a software engineer. I extend an invitation to you, the reader, to immerse yourself in the narratives and discoveries I unfold in the realm of technology. I hope you find inspiration and enjoyment in the stories shared on my blog.
            </p>
            <p>
              Arbab's Blog is my platform for expressing thoughts and ideas, crafted with the intention of sharing my experiences as a software engineer and delving into topics that captivate my interest. Through this blog, I aim to offer readers a glimpse into my professional journey and share valuable insights gained along the way. Your enjoyment in reading my reflections is something I sincerely hope for.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
