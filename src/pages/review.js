import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Issues from '../components/issues';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const Review = () => {

  const query = gql`
  query {
    viewer {
      name
    }
  }
`;


  const [userName, setUserName] = useState(0);
  useEffect(() => {
    // get data from GitHub api
  }, [])


  return (
    <Layout>
      { `test: ${userName}`} 
      <Issues git={userName}/>
    </Layout>
  )
}

export default Review;