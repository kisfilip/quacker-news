import React from 'react';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';

import StoryListItem from './StoryListItem.js';

class StoryCommentsContainer extends React.Component {
  state = {
    storyObj: null
  }

  componentDidMount() {
    fetchTopStoriesObjs(this.props.match.params.id)
    .then(resolved => this.setState({storyObj: resolved}));
  }

  render() {
    console.log(this.state)
    return (
      <div>

      </div>
    );
  }
}

export default StoryCommentsContainer;
