import React from 'react';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';
import fetchStoryCommentsObjs from './api/fetchStoryCommentsObjs.js';

import StoryListItem from './StoryListItem.js';

class StoryCommentsContainer extends React.Component {
  state = {
    loading: true,
    commentsObj: null
  }

  componentDidMount() {
    fetchTopStoriesObjs(this.props.match.params.id)
    .then(resolved => {
      const commentsObj = fetchStoryCommentsObjs(resolved[0]);
      return commentsObj
    }).then(resolved => this.setState({
      commentsObj: resolved,
      loading: false
    }));
  }

  componentDidUpdate() {

  }

  render() {
    console.log(this.state)
    const {commentsObj} = this.state
    let story = null;
    let comments = "loading";
    if (this.state.commentsObj) {
      story = (<StoryListItem
                storyObj = {commentsObj}
                key = {commentsObj.id}
              />);
    }
    return (
      <div>
        {story}
      </div>
    );
  }
}

export default StoryCommentsContainer;
