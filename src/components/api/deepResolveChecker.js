const deepResolveChecker = function(storyObj, setStateCallback) {

  checkByTimeout(checkIfDone(storyObj), setStateCallback);

  function checkIfDone(storyCommentsObj) {

    if (storyCommentsObj == undefined) return false
    if (storyCommentsObj.hasOwnProperty("kids")) {
      return storyCommentsObj.kids.some(comment => {
        if (comment.hasOwnProperty("kids")) {
          return checkIfDone(comment)
        }
        return typeof comment == "number"
      });
    };
  };

  function checkByTimeout(checkFunc, setStateCallback) {
    setTimeout(() => {
      if (!checkFunc) {
        console.log("checked")
        console.log(storyObj)
        setStateCallback(storyObj);
      } else {
        console.log("not checked")
        checkByTimeout(checkIfDone(storyObj), setStateCallback)
      }
    }, 500);
  }
}

export default deepResolveChecker;
