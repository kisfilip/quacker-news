const fetchTopStoriesObjs = function(topStoriesIds, pageNum) {
  let pageIds
  if (typeof topStoriesIds == "string") {
    pageIds = [topStoriesIds];
  } else if (typeof topStoriesIds == "object") {
    pageIds = topStoriesIds.slice(
    30 * (pageNum - 1),
    30 * pageNum
  )};
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
