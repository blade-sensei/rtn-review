import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import Issues from "../components/issues"
import { githubIssues } from '../graphql/githubIssues'

import {
  GlobalStateContext,
} from "../context/GlobalContextProvider"

const Review = () => {
  
  const state = useContext(GlobalStateContext);
 
  const [userName, setUserName] = useState(0);
  const [issues, setIssues] = useState([]);
  let date = new Date();
  date.setHours(0,0,0,0);
  const [currentDate, setCurrentDate] = useState(date);
  const handlerDate = async (e) => {
    console.log(e.target.value)
    const pickedDate = new Date(e.target.value);
    console.log(pickedDate);
    await setCurrentDate(pickedDate);
  }

  const formatDate = () => {
    return currentDate.toJSON().slice(0, 10).replace(/\//g, '-')
  }

  const getGithubIssues = async () => {
    const result = await state.client.query({
      query: githubIssues,
      variables : { date: currentDate.toISOString() }
    })
    console.log(result);
    const { name } = result.data.viewer
    const { edges: issues  } = result.data.viewer.issues;
    setUserName(name);
    const filterIssues = issues.map(issue => {
      let comments = issue.node.comments.edges;
      comments = filterCommentsByDate(comments, currentDate);
      issue.node.comments.edges = comments;
      return issue;
    })
    setIssues(filterIssues);
  }

  useEffect(() => {
    getGithubIssues(); 
  }, []);

  const filterCommentsByDate = (comments, date) => {
    const dateISO = date.toDateString();
    return comments.filter(({node: comment}) => {
      let commentDate = new Date(comment.updatedAt);
      commentDate = commentDate.toDateString();
      return commentDate === dateISO;
    });
  }

  const listIssueComponents =  issues.map(issue => {
    return (<div className='issue-container'>
      <Issues key={issue.node.id } issue={issue.node}/>
    </div>)
    
  });
  return (
    <Layout>
      <div>
        { formatDate() }
        <input type='date' value={formatDate()} onChange={handlerDate}/>
      </div>
      {`github user: ${userName}`}
      { issues.map(issue => {
    return (<div className='issue-container'>
      <Issues key={issue.node.id } issue={issue.node}/>
    </div>)
    
  }) }
    </Layout>
  )
}

export default Review
