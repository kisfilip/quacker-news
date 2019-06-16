import React from 'react';

import {Link} from 'react-router-dom';

class StoryListItem extends React.Component {
  render() {
    const {id, title, by, descendants, score, url} = this.props.storyObj;
    const orderNum = this.props.orderNum;

    const domain = (function() {
      const a = document.createElement('a');
      a.setAttribute('href', url);
      return a.hostname;
    })()

    return (
      <div className="Story-list-item">
        <aside>
          {orderNum}
        </aside>
        <article>
          <div>
            <h1>
              {title}
            </h1>
            <a href={url} target="_blank">
              ({domain})
            </a>
          </div>
          <div>
            <span>
              {score} points by {by}
            </span>
            <span>
              |
            </span>
            <Link to={`/story/${id}`}>
              {descendants} comments
            </Link>
          </div>
        </article>
      </div>
    );
  }
}

export default StoryListItem;

