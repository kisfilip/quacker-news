import React from 'react';
import CommentList from './CommentList.js';

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
        return <CommentList key={comment.id} commentObj={comment} />
          }) : "Loading";

    return (
      <div className="Comments-container">
        {output}
      </div>
    )
  }
}

export default CommentsContainer;
