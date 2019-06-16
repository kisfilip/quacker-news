import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';

import StoryListItem from './StoryListItem';

class TopStoriesContainer extends React.Component {
  state = {
    topStoriesObjs: null,
    pageId: null
  }

  componentDidUpdate() {
    let pageNum = 1;
    if (this.props.match.params.id) {
      pageNum = Number(this.props.match.params.id);
    }
    if (this.state.pageId === null || this.state.pageId !== this.props.match.params.id) {
      fetchTopStoriesObjs(this.props.topStoriesIds, pageNum)
        .then(resolved => this.setState({
          topStoriesObjs: resolved,
          pageId: this.props.match.params.id
        }));
    }
  }

  render() {
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
    let urlMatch = "page2";
    if (this.props.match.params.id) {
      urlMatch = "page" + (Number(this.props.match.params.id) + 1);
    }
    // TODO: disable link button via css pointer-events
    //       until page loads to prevent stacking api calls
    //       (the current solution works but for example -
    //       if a user clicks the 'next 30 items' button
    //       multiple times in a row (until the page has finished loading),
    //       the consequent clicks will stack api calls on top of each other)
    // TODO: navigating back should load previously fetched objects instead
    //       of fetching them again - this can be solved by pushing new objects
    //       to state, and getting them from state when navigating back
    return (
      <div>
        TopStoriesContainer
        { storiesList }
        <Link to={urlMatch}> Next 30 items </Link>
      </div>
    );
  }
}

export default withRouter(TopStoriesContainer);
