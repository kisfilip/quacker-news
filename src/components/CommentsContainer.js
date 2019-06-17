import React from 'react';

class CommentsContainer extends React.Component {
  state = {
    commentsObj: null
  }

  componentDidMount() {
    this.setState({commentsObj: this.props.commentsObj});
  }

  render() {
    return (
      <div>
        Comments container
        {this.props.children}
      </div>
    )
  }
}

export default CommentsContainer;
