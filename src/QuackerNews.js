import React from 'react';
import './QuackerNews.css';

import fetchTopStoriesIds from './components/api/fetchTopStoriesIds.js';

import TopStoriesContainer from './components/TopStoriesContainer.js';
import StoryCommentsContainer from './components/StoryCommentsContainer.js';

class QuackerNews extends React.Component {
  state = {
    topStoriesIds: null
  }

  componentDidMount() {
    fetchTopStoriesIds().then(resolved => this.setState({topStoriesIds: resolved}));
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>
            Quacker News
          </h1>
        </header>
        HelloWorld!
        <TopStoriesContainer topStoriesIds={this.state.topStoriesIds}/>
        <StoryCommentsContainer />
      </div>
    );
  }
}

export default QuackerNews;
