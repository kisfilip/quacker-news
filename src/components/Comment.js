import React from 'react';

class Comment extends React.Component {
  render() {
    const commentObj = this.props.commentObj;
    if (!commentObj.text) return null;
    return (
      <div className="Comment">
        <header>
          <span>
            {commentObj.by}
          </span>
          <span onClick={this.props.collapseToggle}>
            {this.props.collapsed ? "[+]" : "[-]"}
          </span>
        </header>
        <div dangerouslySetInnerHTML={{__html: commentObj.text}}>
        </div>
      </div>
    )
  }
}

export default Comment;

