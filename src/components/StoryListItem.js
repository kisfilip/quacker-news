import React from 'react';

class StoryListItem extends React.Component {
  render() {
    const {title, by, kids, score} = this.props.storyObj;
    const orderNum = this.props.orderNum;
    return (
      <div className="Story-list-item">
        <div>
          {orderNum}
        </div>
        <div>
        {title}{by}{kids}{score}
        </div>
      </div>
    );
  }
}

export default StoryListItem;

