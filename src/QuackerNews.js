import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import './QuackerNews.scss';

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
      <div className="App-quacker-news">
        <header>
          <Link to="/">
            <h1>
              Quacker News
            </h1>
          </Link>
        </header>
        <Switch>
          <Route exact path="/" render={() =>
            <TopStoriesContainer topStoriesIds={this.state.topStoriesIds}/>
          }/>
          <Route path="/page:id" render={() =>
            <TopStoriesContainer topStoriesIds={this.state.topStoriesIds}/>
          }/>
          <Route path="/story/:id" component={StoryCommentsContainer}/>
        </Switch>
      </div>
    );
  }
}

export default QuackerNews;
