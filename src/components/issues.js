import React from "react"

class Issues extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    return <div> list of issues { this.props.issues.node.title } </div>
  }
}

export default Issues
