import React from 'react';

class StoryListItem extends React.Component {
  render() {
    const {title, by, kids, score} = this.props.storyObj;
    return (
      <div>
        {title}{by}{kids}{score}
      </div>
    );
  }
}

export default StoryListItem;

