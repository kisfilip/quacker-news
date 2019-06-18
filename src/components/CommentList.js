import React from 'react';
import Comment from './Comment.js';

class CommentList extends React.Component {
  render() {
    const output = this.props.commentObj.kids ?
      this.props.commentObj.kids.map(comment => {
        return <CommentList commentObj={comment} />
          }) : null;

    return (
      <div className="Comment-list">
        "commentList"
        <Comment commentObj={this.props.commentObj} />
        {output}
      </div>
    )
  }
}

export default CommentList;

