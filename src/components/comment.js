import React from "react"
import ReactHtmlParser from 'react-html-parser';

const Comment = ({comment}) => {
  
  return (
   <div> list of comment { ReactHtmlParser(comment.bodyHTML) } </div>
  )
}

export default Comment
