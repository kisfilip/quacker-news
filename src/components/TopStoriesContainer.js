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
