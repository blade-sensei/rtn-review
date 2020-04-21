import React, { useState } from "react"
import Comment from './comment';
import './issue.css';

const Issues = ({issue}) => {

  const [isOpen, setIsOpen] = useState(true);

  const iconToggle = {
    open: '\u25BC',
    close: '\u25B6',
  }
  const handlerToggle = () => {
    setIsOpen(!isOpen);
  }

  const getArrow = () => {
    const icon = isOpen ? iconToggle.open : iconToggle.close;
    return (
      <span className='icon-toggle' onClick={handlerToggle}> {icon} </span>
    )
  }

  return (
    <div className='c-issue'>
      { getArrow() }
      <span> { isOpen.toString() } </span>      
      { isOpen && 
        <div className='issue-info'> 
          <span> state: { issue.state } </span>
        <a href={ issue.url }>issue url </a>
        <div> { issue.title } </div>
        <span> { issue.number } / { issue.repository.name} </span>
        <div className='labels'>
          {
            issue.labels.edges.map(({node: label }) => (
              <span> #{ label.name } </span>
            ))
          }
        </div>
        <span> number of comments: { issue.comments.edges.length } </span>
        {
          issue.comments.edges.map(({ node:comment }) => (
            <Comment key={comment.id} comment={comment} />
          ))
        }
        </div>
      }
    </div>

  )
}

export default Issues
