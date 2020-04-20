import React from "react"
import Comment from './comment';


const Issues = ({issue}) => {
  
  return (
    <div className='issue-container'>
      <span> state: { issue.state } </span>
      <a href={ issue.url }>issue url </a>
      <div> { issue.title } </div>
      <span> { issue.number } / { issue.repository.name} </span>
      <div className='test'>
        { issue.labels.edges.map(({node: label }) => (
          <span> #{ label.name } </span>
        ))
        }
      </div>
      {
        issue.comments.edges.map(({ node:comment }) => (
          <Comment key={comment.id} comment={comment} />
        ))
      }

    </div>

  )
}

export default Issues
