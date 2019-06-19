const deepResolveChecker = function(storyObj, setStateCallback) {

  checkByTimeout(checkIfDone(storyObj), setStateCallback);

  function checkIfDone(storyCommentsObj) {
    if (storyCommentsObj === undefined) return false;
    if (storyCommentsObj.hasOwnProperty("kids")) {
      return storyCommentsObj.kids.some(comment => {
        if (comment == null) return;
        if (comment.hasOwnProperty("kids")) {
          return checkIfDone(comment);
        }
        return typeof comment == "number";
      });
    };
  };

  function checkByTimeout(checking, setStateCallback) {
    setTimeout(() => {
      if (!checking) {
        setStateCallback(storyObj);
      } else {
        checkByTimeout(checkIfDone(storyObj), setStateCallback)
      }
    }, 500); //Checks if nested comment objects are resolved.
  }
}

export default deepResolveChecker;
