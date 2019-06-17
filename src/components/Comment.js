import React from 'react';

class Comment extends React.Component {
  render() {
    return (
      <div>
        Comment
        {this.props.children}
      </div>
    )
  }
}

export default Comment;

