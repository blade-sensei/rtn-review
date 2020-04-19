import React, { useState } from "react"
import  ApolloClient  from 'apollo-boost';
export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const token = 'e6edbaf1ecc806adfbacf1aff299a0953bdabe82';
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


const initialState = {
  client
}

function reducer(state, action) {
  return state;
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider