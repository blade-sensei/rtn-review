import React from "react"
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


const token = '74e24bcbe0b65796f70d82a33c8b093a0bd06ad4';
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


const GlobalContextProvider = ({ children }) => {
  return (
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
  )
}

export default GlobalContextProvider