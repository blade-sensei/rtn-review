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
    open: '\u25B8',
    close: '\u25BE'
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
   
        <div className='comment-info'>
          <div className='title'>
            <a className='link' href={comment.url} target="_blank"> comment on : {formatDate(comment.updatedAt)} </a>
          </div>
          { isOpen && 
          <div className='comment-body markdown'>
          <ReactMarkdown
            source={comment.body}
            renderers={
              { code: CodeBlock}
              
            }
          />
          
          </div>
          }
        </div>
      
    </div>
  )
}

export default Comment
