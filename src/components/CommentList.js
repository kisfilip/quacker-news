import React from 'react';

class CommentList extends React.Component {
  render() {
    return (
      <div>
        Comment list
        {this.props.children}
      </div>
    )
  }
}

export default CommentList;

