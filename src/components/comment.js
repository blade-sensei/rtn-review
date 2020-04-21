import React, { useState } from "react"
const ReactMarkdown = require('react-markdown')
const Comment = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handlerToggle = () => {
    setIsOpen(!isOpen);
  }

  const formatDate = (dateISOString) => {
    const date = new Date(dateISOString);
    return (
      `${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`  
    )
  }

  return (
    <div className='c-comment'>
      <button onClick={handlerToggle} > {'comment ' + isOpen.toString()}</button>
      { isOpen && 
        <div className='comment-info'>
          <a href={comment.url}> go to </a>
          <span>comment on : {formatDate(comment.updatedAt)}</span>
          <ReactMarkdown source={comment.body} />
        </div>
      }
    </div>
  )
}

export default Comment
