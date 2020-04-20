import React from "react"
const ReactMarkdown = require('react-markdown')
const Comment = ({comment}) => {
  
  return (
   <div> list of comment
     <ReactMarkdown  source={comment.body} />
  </div>
  )
}

export default Comment
