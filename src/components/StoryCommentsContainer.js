import React from 'react';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';
import fetchStoryCommentsObjs from './api/fetchStoryCommentsObjs.js';

import StoryListItem from './StoryListItem.js';

class StoryCommentsContainer extends React.Component {
  state = {
    storyObj: null,
    commentsObj: null
  }

  componentDidMount() {
    fetchTopStoriesObjs(this.props.match.params.id)
    .then(resolved => {
      const commentsObj = fetchStoryCommentsObjs(resolved[0]);
      return commentsObj
    }).then(resolved => this.setState({
      commentsObj: resolved,
    }));
  }

  componentDidUpdate() {

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
