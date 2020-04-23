import React from "react"
import Header from "./header"

export default ({ children }) => {
  return (
    <div>
      <Header />
      <div> git issue comments </div>
      <div> {children} </div>
    </div>
  )
}
