import React from "react"
const ReactMarkdown = require('react-markdown')
const Comment = ({comment}) => {
  
  return (
   <div>
     <a href={ comment.url }> go to </a>
     <span>comment on : {comment.updatedAt }</span>
     <ReactMarkdown  source={comment.body} />
  </div>
  )
}

export default Comment
