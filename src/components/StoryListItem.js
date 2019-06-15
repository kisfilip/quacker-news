import React from 'react';

class StoryListItem extends React.Component {
  render() {
    const {title, author, kids, score} = this.props.storyObj;
    return (
      <div>
        {title}{author}{kids}{score}
      </div>
    );
  }
}

export default StoryListItem;

