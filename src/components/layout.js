import React from "react"
import Header from "./header"
import Footer from "./footer"

export default ({ children }) => {
  return (
    <div>
      <Header />
      <div> this is layout content: </div>
      <div> {children} </div>
      <Footer />
    </div>
  )
}
