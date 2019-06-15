import React from 'react';

import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';

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
    return (
      <div>
        TopStoriesContainer
      </div>
    );
  }
}

export default TopStoriesContainer;
