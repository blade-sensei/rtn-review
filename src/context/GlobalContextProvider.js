import React, { useState } from "react"
import  ApolloClient  from 'apollo-boost';
export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const token = '5aa240a0ae3682f5112aa4ab844d4a4bbb70fed7';
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