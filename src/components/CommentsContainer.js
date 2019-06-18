import React from 'react';

import CommentList from './CommentList.js';
import Comment from './Comment.js';

class CommentsContainer extends React.Component {
  state = {
    commentsObj: null
  }

  commentsRender(comments) {
    console.log(comments)
    const output = comments.map(comment => {
      return (<CommentList key={comment.id} className="Comment-List">
                <Comment className="Comment">
                </Comment>
              </CommentList>

      );
    });
    return output;
  }

  componentDidMount() {
    this.setState({commentsObj: this.props.commentsObj});
  }

  render() {

    let output

    if (this.state.commentsObj) {
      const {kids} = this.state.commentsObj;
      console.log(kids)
      output = this.commentsRender(kids)
    }

    return (
      <div>
        <CommentList>
          {output}
        </CommentList>
      </div>
    )
  }
}

export default CommentsContainer;
