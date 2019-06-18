import React from 'react';
import {unescape} from 'lodash';
import stripTags from 'striptags';

class Comment extends React.Component {
  cleanText = text => {
    // remove html tags
    let cleanedText= stripTags(text)
    // remove special characters &gt, &lt
    cleanedText = unescape(cleanedText);
    // remove apostrophe, for some reason it is not captured
    cleanedText = cleanedText.replace(new RegExp("&#x27;", 'g'), "'");
    return cleanedText;
  }
  render() {
    const commentObj = this.props.commentObj
    if (!commentObj.text) return null
    return (
      <div>
        <header>
          <span>
            "comment"
            {commentObj.by}
          </span>
          <span>
            +
          </span>
        </header>
        <div>
          {this.cleanText(commentObj.text)}
        </div>
      </div>
    )
  }
}

export default Comment;

