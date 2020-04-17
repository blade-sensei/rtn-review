import React from 'react';

class Issues extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props)
  }

  render() {
    return (
      <div> list of issues </div>
    )
  }
}

export default Issues;