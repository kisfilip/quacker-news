import React from 'react';

import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';

import StoryListItem from './StoryListItem';
class TopStoriesContainer extends React.Component {
  state = {
    topStoriesObjs: null
  }

  componentDidUpdate() {
    if (this.props.topStoriesIds && !this.state.topStoriesObjs) {
      fetchTopStoriesObjs(this.props.topStoriesIds)
        .then(resolved => this.setState({topStoriesObjs: resolved}));
    }
  }

  render() {
    console.log(this.state)
    let storiesList
    if (this.state.topStoriesObjs) {
      storiesList = this.state.topStoriesObjs.map(storyObj => {
        return (
          <StoryListItem
            storyObj={storyObj}
            key={storyObj.id}
          />
        );
      });
    };
    return (
      <div>
        TopStoriesContainer
        { storiesList }
      </div>
    );
  }
}

export default TopStoriesContainer;
