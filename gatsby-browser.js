import React from "react"
import "./src/styles/global.css";
import GlobalContextProvider from "./src/context/GlobalContextProvider"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}