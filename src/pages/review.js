import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Issues from "../components/issues"
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'



const Review = () => {
  
  const test = gql`
  query {
  
    viewer {
      name
    }
  }
`
  const { loading, error, data } = useQuery(test);
  console.log(data);

  const [userName, setUserName] = useState(0)
  useEffect(() => {

    // get data from GitHub api
  }, [])

  return (
    <Layout>
      {`test: ${userName}`}
      <Issues git={userName} />
    </Layout>
  )
}

export default Review
