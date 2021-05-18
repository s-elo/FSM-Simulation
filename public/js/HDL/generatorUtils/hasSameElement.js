
/**
 * @param {inputCondition[i]} array
 * @returns: if there are transitions with same conditions, return true
 * otherwise false
 */
export default function hasSameElement(array) {
  const nextStateNum = array.length;

  function isAllSame(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    if (arr1 === arr2) return true;

    for (const [index, val] of arr1.entries()) {
      if (val !== arr2[index]) return false;
    }
    return true;
  }

  for (let i = 0; i < nextStateNum; i++) {
    // has a transition
    if (array[i][0] !== -1) {
      // compare with other transitions
      for (let j = 0; j < nextStateNum; j++) {
        if (array[j][0] !== -1 && j !== i) {
          // compare each inputs
          if (isAllSame(array[j], array[i])) return true;
        }
      }
    }
  }

  return false;
}
