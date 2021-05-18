import isElementEqual from "./isElementEqual.js";
import isAllX from "./isAllX.js";
import hasSameElement from "./hasSameElement.js";

/**
 * see if the params has been set
 * return true means can not generate and simulate
 * otherwise return undefine
 */
export default function reminder() {
  // left params
  if (!stepOneFlag || !finishFlag) {
    alert("please finish the parameters setting at the left side");
    return true;
  } else if (stateNumber === 0) {
    alert("please finish the state diagram");
    return true;
  }
  for (let i = 1; i <= stateNumber; i++) {
    let f = 1;
    for (let j = 1; j <= stateNumber; j++) {
      if (Tline[i][j] != 0) {
        f = 0;
        break;
      }
    }
    if (f) {
      alert("each state must have at least one next state");
      return true;
    }
  }

  const inputNum = parseInt($("#inputNumber").val());
  const inputCondition = [];
  for (let i = 0; i < Tline.length; i++) {
    inputCondition[i] = new Array(Tline[i].length);

    for (let j = 0; j < Tline[i].length; j++) {
      inputCondition[i][j] = new Array(inputNum).fill(-1);

      if (Tline[i][j] != 0) {
        for (let k = 0; k < inputNum; k++) {
          inputCondition[i][j][k] = $("#input" + i + j + (k + 1)).val();
        }
      }
    }
  }

  // inputs of each transition must be different
  for (let i = 1; i <= stateNumber; i++) {
    let cnt = 0;
    for (let j = 1; j <= stateNumber; j++) {
      if (Tline[i][j] != 0) {
        cnt++;
        //when there are at least two transitions
        if (cnt > 1) break;
      }
    }

    //when there are at least two transitions
    if (cnt > 1) {
      if (isElementEqual(inputCondition[i])) {
        alert("inputs of each transition must be different");
        return true;
      }

      // see if there a transition with all 'X' when more than one transition
      for (let j = 1; j < stateNumber; j++) {
        if (Tline[i][j] != 0) {
          if (isAllX(inputCondition[i][j])) {
            alert(`${$("#t" + i).html()} should not have a 'X' transition`);
            return true;
          }
        }
      }

      // see if there are transitions with same conditions
      if (hasSameElement(inputCondition[i])) {
        alert(
          `the transitions of ${$(
            "#t" + i
          ).html()} can not have same conditions`
        );
        return true;
      }
    }

    // inputs shoud be all 'X'
    if (cnt === 1) {
      for (let j = 1; j <= stateNumber; j++) {
        if (Tline[i][j] != 0) {
          if (isAllX(inputCondition[i][j])) break;
          else {
            alert(`the inputs of ${$("#t" + i).html()} should be 'X'`);
            return true;
          }
        }
      }
    }
  }
}
