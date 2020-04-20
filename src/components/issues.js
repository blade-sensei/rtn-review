import React from "react"


const Issues = ({issue}) => {
  
  return (
    <div className='issue-container'>
      <span> state: { issue.state } </span>

      <div> { issue.title } </div>
      <span> { issue.number } / { issue.repository.name} </span>
      <div className='test'>
        { issue.labels.edges.map(({node: label }) => (
          <span> #{ label.name } </span>
        ))
        }
      </div>
    </div>

  )
}

export default Issues
