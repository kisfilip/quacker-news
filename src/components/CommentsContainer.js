import React from 'react';

import CommentList from './CommentList.js';
import Comment from './Comment.js';

class CommentsContainer extends React.Component {
  state = {
    commentsObj: null
  }

  componentDidMount() {
    this.setState({commentsObj: this.props.commentsObj});
  }

  render() {
    const output = this.state.commentsObj ?
      this.state.commentsObj.kids.map(comment => {
        return <CommentList commentObj={comment} />
          }) : "Loading";

    return (
      <div>
        {output}
      </div>
    )
  }
}

export default CommentsContainer;
