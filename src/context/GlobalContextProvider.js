import React, { useState } from "react"
import  ApolloClient  from 'apollo-boost';
export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const token = '18f4c62def03f8c13e01caf2bf9e0bccc0691ad5';
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

function reducer(state) {
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