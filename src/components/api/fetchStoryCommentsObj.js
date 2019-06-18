const fetchStoryCommentsObjs = function(storyObj) {
  function deepIdToObj(obj) {
    if (obj.hasOwnProperty("kids")) {
      const fetchArr = obj.kids.map(id => {
        const fetched = fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
        return fetched
          .then(results => {
            return results.json();
          });
      });
      return Promise.all(fetchArr)
        .then(values => {
          obj.kids = values;
          obj.kids.forEach(obj => deepIdToObj(obj));
          return obj;
        });
    };
    return
  }
  return deepIdToObj(storyObj);
}

export default fetchStoryCommentsObjs;
