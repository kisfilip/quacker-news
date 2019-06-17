import React from 'react';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';
import fetchStoryCommentsObjs from './api/fetchStoryCommentsObjs.js';

import StoryListItem from './StoryListItem.js';

class StoryCommentsContainer extends React.Component {
  state = {
    storyObj: null,
    commentsObjs: null
  }

  componentDidMount() {
    fetchTopStoriesObjs(this.props.match.params.id)
    .then(resolved => this.setState({storyObj: resolved}));
  }

  componentDidUpdate() {
    if (this.state.storyObj && !this.state.commentsObjs) {
      fetchStoryCommentsObjs(this.state.storyObj)
    }
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
