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
  const [currentDate, setCurrentDate] = useState(new Date('2020-04-19'));

  useEffect(() => {
    const getGithubIssues = async () => {
      const result = await state.client.query({
        query: githubIssues,
        variables : { date: currentDate.toISOString() }
      })
      const { name } = result.data.viewer
      const { edges: issues  } = result.data.viewer.issues;
      setUserName(name);
      const filterIssues = issues.map(issue => {
        let comments = issue.node.comments.edges;
        comments = filterCommentsByDate(comments, currentDate);
        console.log(comments);
        issue.node.comments.edges = comments;
        return issue;
      })
      setIssues(filterIssues);
    }
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
      {`github user: ${userName}`}
      { listIssueComponents }
    </Layout>
  )
}

export default Review
