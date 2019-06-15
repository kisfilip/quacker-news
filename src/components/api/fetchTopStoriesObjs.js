const fetchTopStoriesObjs = function(topStoriesIds) {
  const pageIds = topStoriesIds.slice(0, 30);
  const fetchArr = Promise.all(
    pageIds.map(id => {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(results => {
          return results.json();
        });
      })
  );
  return fetchArr;
}

export default fetchTopStoriesObjs;
