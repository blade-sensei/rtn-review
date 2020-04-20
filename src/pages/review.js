import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import Issues from "../components/issues"
import { gql } from "apollo-boost";
import { githubIssues } from '../graphql/githubIssues'

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

const Review = () => {
  
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
 
  const [userName, setUserName] = useState(0)
  const [issues, setIssues] = useState([])
  useEffect(() => {

    console.log(dispatch)
    state.client.query({
      query: githubIssues
    })
    .then(result => {
      
      const { name } = result.data.viewer
      const { edges: issues  } = result.data.viewer.issues;
      setUserName(name);
      setIssues(issues);
    });

    // get data from GitHub api
  }, [])
  const handleClick = () => {
    setUserName('test');
  }
  console.log(issues);

  const issuesComp =  issues.map(issue => ( <Issues key={issue.node.id } issue={issue.node}/>));
  return (
    <Layout>
      {`github user: ${userName}`}
      {
        issuesComp
      }
    </Layout>
  )
}

export default Review
