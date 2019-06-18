import React from 'react';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';
import fetchStoryCommentsObjs from './api/fetchStoryCommentsObjs.js';

import StoryListItem from './StoryListItem.js';
import CommentsContainer from './CommentsContainer.js';

class StoryCommentsContainer extends React.Component {
  state = {
    loading: true,
    storyObj: null,
    commentsObj: null
  }

  componentDidMount() {
    fetchTopStoriesObjs(this.props.match.params.id)
    .then(resolved => {
      this.setState({storyObj: resolved[0]});
      const commentsObj = fetchStoryCommentsObjs(resolved[0]);
      return commentsObj
    }).then(resolved => setTimeout(() => this.setState({
      commentsObj: resolved,
      loading: false
    }), 10000));
  }

  componentDidUpdate() {

  }

  render() {
    const {storyObj, commentsObj} = this.state

    let story = null;
    if (storyObj) {
      story = (<StoryListItem
                storyObj = {storyObj}
                key = {storyObj.id}
              />);
    };

    let comments = "loading";
    if (commentsObj) {
      comments = (
        <CommentsContainer
          commentsObj={commentsObj}
        />
      )
    }

    return (
      <div>
        {story}
        {comments}
      </div>
    );
  }
}

export default StoryCommentsContainer;
