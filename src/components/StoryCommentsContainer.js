import React from 'react';
import fetchTopStoriesObjs from './api/fetchTopStoriesObjs.js';
import fetchStoryCommentsObj from './api/fetchStoryCommentsObj.js';
import deepResolveChecker from './api/deepResolveChecker.js';

import StoryListItem from './StoryListItem.js';
import CommentsContainer from './CommentsContainer.js';

class StoryCommentsContainer extends React.Component {
  state = {
    loading: true,
    storyObj: null,
    commentsObj: null
  }

  setStateCallback = (storyCommentsObj) => {
    this.setState({
      commentsObj: storyCommentsObj,
      loading: false
    });
  }

  componentDidMount() {
    fetchTopStoriesObjs(this.props.match.params.id)
    .then(resolved => {
      this.setState({storyObj: resolved[0]});
      const commentsObj = fetchStoryCommentsObj(resolved[0]);
      return commentsObj
    }).then(resolved =>
      deepResolveChecker(resolved, this.setStateCallback)
    );
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
