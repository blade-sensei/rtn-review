import React, { useState } from "react"
import './comment.css';
import CodeBlock from './CodeBlock'

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

  const iconToggle = {
    open: '\u25BC',
    close: '\u25B6',
  }

  const getArrow = () => {
    const icon = isOpen ? iconToggle.open : iconToggle.close;
    return (
      <span className='icon-toggle' onClick={handlerToggle}> {icon} </span>
    )
  }

  return (
    <div className='c-comment'>
      { getArrow()}
      { isOpen && 
        <div className='comment-info'>
          <a href={comment.url}> go to </a>
          <span>comment on : {formatDate(comment.updatedAt)}</span>
          <div className='comment-body markdown'>
          <ReactMarkdown
            source={comment.body}
            renderers={
              { code: CodeBlock}
              
            }
          />
          </div>
        </div>
      }
    </div>
  )
}

export default Comment
