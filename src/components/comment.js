import React from "react"

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    return <div> list of comment { this.props.node.bodyHTML } </div>
  }
}

export default Comment
