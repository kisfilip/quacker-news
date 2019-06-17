import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';

import StoryListItem from './StoryListItem.js';

class TopStoriesContainer extends React.Component {
  state = {
    topStoriesObjs: [],
    pageId: 1,
    navigateBackToggle: true
  }

  componentDidMount() {
    // This will only fire if a component REmounts.
    // Since the topStoriesIds are not available on initial mount,
    // this will ensure that the toggle triggers the componentDidUpdate
    // only when navigating back from a story.
    if (this.props.topStoriesIds) {
      this.setState({navigateBackToggle: !this.state.navigateBackToggle})
    }
  }

  // Initial fire when topStoriesIds are recieved.
  // Successive fire when url/path changes.
  componentDidUpdate() {
    const pageNum = this.props.match.params.id ? Number(this.props.match.params.id) : 1;
    const topStories = this.findPageTopStories(pageNum);

    if (topStories) {
      if (this.state.pageId !== pageNum) this.setState({pageId: pageNum});
    }
    else {
      fetchTopStoriesObjs(this.props.topStoriesIds, pageNum)
        .then(stories => this.setState({
          topStoriesObjs: this.state.topStoriesObjs.concat({pageNum, stories}),

          // Prevents componentDidUpdate infinite loop.
          // Initial opening of home page sets pageId to undefined.
          pageId: pageNum
        }));
    }
  }

  render() {
    let orderNum = (this.state.pageId - 1) * 30; // Used for ordering StoryListItem-s.

    const storiesObj = this.findPageTopStories(this.state.pageId);
    const stories = storiesObj ? storiesObj.stories : [];

    const storiesList = stories.map(storyObj => {
      orderNum++;
      return (
        <StoryListItem
          storyObj={storyObj}
          key={storyObj.id}
          orderNum={orderNum}
        />
      );
    });

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

  findPageTopStories = pageNum => {
    return this.state.topStoriesObjs.find(topStory => topStory.pageNum === pageNum);
  }
}

export default withRouter(TopStoriesContainer);
