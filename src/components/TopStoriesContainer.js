import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import StoryListItem from './StoryListItem.js';

class TopStoriesContainer extends React.Component {
  state = {
    topStoriesObjs: [],
    pageId: 1,
    backNavToggle: true
  }

  throttledFetchTopStoriesObjs = AwesomeDebouncePromise(fetchTopStoriesObjs, 300);

  findPageTopStories = pageNum => {
    return this.state.topStoriesObjs.find(topStory => topStory.pageNum === pageNum);
  }

  componentDidMount() {
    // Render page when navigating back from a story.
    this.setState({backNavToggle: !this.state.backNavToggle});
  }

  // Successive fire when url/path changes.
  componentDidUpdate() {
    const pageNum = this.props.match.params.id ? Number(this.props.match.params.id) : 1;
    const topStories = this.findPageTopStories(pageNum);

    if (topStories) {
      if (this.state.pageId !== pageNum) this.setState({pageId: pageNum});
    }
    else {
      // Resolve only the last API call if next/previous is spammed.
      this.throttledFetchTopStoriesObjs(this.props.topStoriesIds, pageNum)
        .then(stories => this.setState({
          topStoriesObjs: this.state.topStoriesObjs.concat({pageNum, stories}),

          // Prevents componentDidUpdate infinite loop.
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
