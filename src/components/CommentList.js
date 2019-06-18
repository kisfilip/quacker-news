import React from 'react';
import Comment from './Comment.js';

class CommentList extends React.Component {
  state = {
    collapsed: false
  }

  collapseToggle = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    const output = this.props.commentObj.kids ?
      this.props.commentObj.kids.map(comment => {
        return <CommentList commentObj={comment} />
          }) : null;

    return (
      <div className={`Comment-list ${this.state.collapsed && "Collapsed"}`}>
        <Comment
          commentObj={this.props.commentObj}
          collapseToggle={this.collapseToggle}
          collapsed={this.state.collapsed}
        />
        {output}
      </div>
    )
  }
}

export default CommentList;

