import React from 'react';

import {Link} from 'react-router-dom';

class StoryListItem extends React.Component {
  render() {
    const {id, title, by, descendants, score, url} = this.props.storyObj;
    const orderNum = this.props.orderNum;
    const commentString = descendants === 1 ? "comment" : "comments";
    const scoreString = score === 1? "point" : "points";
    const domain = (function domainFromUrl() {
      if (!url) return null;
      const a = document.createElement('a');
      a.setAttribute('href', url);
      return `(${a.hostname})`;
    })();

    return (
      <div className="Story-list-item">
        <aside>
          {orderNum}
        </aside>
        <article>
          <div>
            <h1>
              <a href={url} target="_blank">
                {title}
              </a>
            </h1>
            <span>
              {domain}
            </span>
          </div>
          <div>
            <span>
              {score} {scoreString} by {by}
            </span>
            <span>
              |
            </span>
            <Link to={`/story/${id}`}>
              {descendants} {commentString}
            </Link>
          </div>
        </article>
      </div>
    );
  }
}

export default StoryListItem;

