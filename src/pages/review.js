import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import Issues from "../components/issues"
import { gql } from "apollo-boost";

import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

const Review = () => {
  
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
 
  const [userName, setUserName] = useState(0)
  useEffect(() => {

    console.log(dispatch)
    state.client.query({
      query: gql`
        {
          viewer {
            name
          }
        }
      `
    })
    .then(result => {
      console.log(result)
      setUserName(result.data.viewer.name);
    });

    // get data from GitHub api
  }, [])
  const handleClick = () => {
    setUserName('test');
  }
  console.log(state);

  return (
    <Layout>
      {`test: ${userName}`}
      <button onClick={ handleClick }> change </button>
      <Issues git={userName} />
    </Layout>
  )
}

export default Review
