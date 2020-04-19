import React, { useState } from "react"
import  ApolloClient  from 'apollo-boost';
export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const token = 'df0ad05d2d05bb3f3790d060860499fd017c2b26';
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