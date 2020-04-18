import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Issues from '../components/issues';
import ApolloClient, { gql } from 'apollo-boost';
import { execute } from 'apollo-link'
import { HttpLink } from 'apollo-link-http';
import { useQuery } from '@apollo/react-hooks';



const Review = () => {

  const query = `{
  
    viewer {
    issues(
      first: 5
      orderBy: { field: UPDATED_AT, direction: ASC},
      filterBy: { since: "2020-04-18T00:00:00Z"}
    ) {
        edges {
          node {
            repository {
              name
            }
            labels(first: 4) {
              edges {
                node {
                  name
                }
              }
            }
            title,
            createdAt,
            updatedAt
            state
            comments(first:10) {
              edges {
                node {
                  bodyHTML
                  createdAt,
                  updatedAt
                }
              }
            }
          }
        }
      }
    }
  }`;


  const [userName, setUserName] = useState(0);
  useEffect(() => {

    fetch('https://api.github.com/graphql', {
    method: 'POST',
   headers: {
    'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': 'Bearer 187ee7c14663be1e0b933595756151568264d7e2',
    },
  body: JSON.stringify({ query }),
})
  .then(res => {
    console.log(res);
    return res.json()
  })
  .then(res => console.log(res.data));
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