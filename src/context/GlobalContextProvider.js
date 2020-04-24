import React from "react"
import ApolloClient  from 'apollo-boost';
import githubToken from '../secrets'
import fetch from 'isomorphic-fetch';



export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const token = githubToken;
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  fetch,
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