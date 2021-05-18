export default function clearAllClick() {
  if (stateNumber === 0) {
    return;
  }

  const deleteBtn = document.getElementById("delete");
  if (circleFlag.findIndex((x) => x === 1) != -1) {
    const curStateNum = stateNumber;
    for (let i = 0; i < curStateNum; i++) {
      deleteBtn.click();
    }
  } else {
    //  make sure all the lines are not selected
    for (let i = 0; i < lineFlag.length; i++) {
      lineFlag[i].fill(0);
    }

    // select the first state
    circleFlag.fill(0);
    circleFlag[1] = 1;

    // trigger itself
    this.click();
  }
}
