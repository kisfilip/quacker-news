const fetchTopStoriesIds = function() {
  const topStoriesIds = fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then(results => {
        return results.json();
      });
  return topStoriesIds;
}

export default fetchTopStoriesIds;
