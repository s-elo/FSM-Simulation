/**
 * only used in arrays with two demensions
 * only used to see if all the outputs/inputs of each transition are the same (moore)
 */
export default function isElementEqual(array) {
  let flag = 0;
  let temp = null;

  for (let i = 0; i < array.length; i++) {
    //find the first then stop
    if (array[i][0] != -1 && flag === 0) {
      temp = array[i];
      flag = 1;
    }

    //compare each one
    if (array[i][0] != -1) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] != temp[j]) return false;
      }
    }
  }
  return true;
}
