import React from 'react'

const Post = ({ setProgress }) => {

    React.useEffect(() => {
        document.title = `Update Post | MERN - Blogger`;
        setProgress(20)
        setTimeout(() => {

            setProgress(100)
        }, 400);
    }, [])

    return (
        <div>
            Post
        </div>
    )
}

export default Post
