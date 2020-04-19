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
  const [issues, setIssues] = useState(0)
  useEffect(() => {

    console.log(dispatch)
    state.client.query({
      query: githubIssues
    })
    .then(result => {
      console.log(result)
      const { name } = result.data.viewer
      const {edges: issues  } = result.data.viewer.issues;
      setUserName(name);
      setIssues(issues);
    });

    // get data from GitHub api
  }, [])
  const handleClick = () => {
    setUserName('test');
  }
  console.log(state);

  return (
    <Layout>
      {`github user: ${userName}`}
      {`issues: ${issues}`}
      <button onClick={ handleClick }> change </button>
      <Issues git={userName} />
    </Layout>
  )
}

export default Review
