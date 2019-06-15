import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
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
    console.log(this.props)
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
