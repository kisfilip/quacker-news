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

  // Initial fire when topStoriesIds are recieved.
  // Successive fire when url/path changes.
  componentDidUpdate() {
    let pageNum = 1; // Initial display page.

    if (this.props.match.params.id) {
      pageNum = Number(this.props.match.params.id); // Set display page via url/path.
    }

    if (this.state.pageId !== this.props.match.params.id) {
      fetchTopStoriesObjs(this.props.topStoriesIds, pageNum)
        .then(resolved => this.setState({
          topStoriesObjs: resolved,

          // Prevents componentDidUpdate infinite loop.
          // Initial opening of home page sets pageId to undefined.
          pageId: this.props.match.params.id
        }));
    }
  }

  render() {
    let storiesList;

    if (this.state.topStoriesObjs) {
      let orderNum = (this.state.pageId - 1) * 30; // Used for ordering StoryListItem-s.
      if (!orderNum) {orderNum = 0}; // Prevents undefined value on initial app load.

      storiesList = this.state.topStoriesObjs.map(storyObj => {
        orderNum++;
        return (
          <StoryListItem
            storyObj={storyObj}
            key={storyObj.id}
            orderNum={orderNum}
          />
        );
      });
    };
    let urlMatch = "page2";
    if (this.props.match.params.id) {
      urlMatch = "page" + (Number(this.props.match.params.id) + 1);
    }
    // TODO: Disable link button via css pointer-events
    //       until page loads to prevent stacking api calls
    //       (the current solution works but for example -
    //       if a user clicks the 'next 30 items' button
    //       multiple times in a row (until the page has finished loading),
    //       the consequent clicks will stack api calls on top of each other).
    // TODO: Navigating back should load previously fetched objects instead
    //       of fetching them again - this can be solved by pushing new objects
    //       to state, and getting them from state when navigating back.
    return (
      <div className="Stories-container">
        <div className="Stories-list">
          { storiesList }
        </div>

        <Link
          to={urlMatch}
          className="Show-next-page"
        >
          <span>
            More stories
          </span>
        </Link>
      </div>
    );
  }
}

export default withRouter(TopStoriesContainer);
