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
  .then(result => console.log(result));
  const [userName, setUserName] = useState(0)
  useEffect(() => {

    // get data from GitHub api
  }, [])

  console.log(state);

  return (
    <Layout>
      {`test: ${userName}`}
      <Issues git={userName} />
    </Layout>
  )
}

export default Review
