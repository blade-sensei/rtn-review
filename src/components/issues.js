import React, { useState } from "react"
import Comment from './comment';
import Label from './label';
import './issue.css';
import { useStaticQuery } from "gatsby";

const Issues = ({issue}) => {

  const [isOpen, setIsOpen] = useState(true);

  const iconToggle = {
    open: '\u25BC',
    close: '\u25B6',
  }
  const handlerToggle = () => {
    setIsOpen(!isOpen);
  }

  const getState = () => {
    return issue.state === 'CLOSED' ? `closed `: `open`
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
        <div className='issue-info'>
          <span className="issue-title">
            <a href={ issue.url }> { issue.title} #{issue.number} / </a>
          </span>
          <span className='repo-name'>
            <a href={ issue.repository.url }> {issue.repository.name} </a>
            </span>
          <span className={`issue-state ${getState()}`}>{ getState()} </span>
        <div className='labels'>
          {
            issue.labels.edges.map(({node: label }) => (
              <Label label={ label }/>
            ))
          }
          <span className="total-comments">✍️ { issue.comments.edges.length } comments</span>
        </div>
        { isOpen && 
          issue.comments.edges.map(({ node:comment }) => (
            <Comment key={comment.id} comment={comment} />
          ))
        }
        </div>
    </div>
  )
}

export default Issues
