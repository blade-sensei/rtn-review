import React from "react"
import ApolloClient, { gql } from 'apollo-boost';

const token = 'e2b30fa62a9daac7f09a08d4a637a2dbab917660';
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
});

client
  .query({
    query: gql`
    query {
      viewer {
        name
      }
    }    
    `
  })
  .then(result => console.log(result.data));

export default () => <div>Hello world!</div>
