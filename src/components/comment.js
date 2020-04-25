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
      <span className='icon-toggle'> {icon} </span>
    )
  }

  return (
    <div className='c-comment'>
   
        <div className='comment-info'>
          <div className='title'  onClick={handlerToggle}  >
            <a className='link' href={comment.url} target="_blank"> comment on : {formatDate(comment.updatedAt)} </a>
            { getArrow()}

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
