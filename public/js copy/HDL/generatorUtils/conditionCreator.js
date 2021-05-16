export default function conditionCreator(inputArray) {
  let ret = ``;
  //bit
  if (inputTypeFlag) {
    let count = 1;
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] != "X" && inputArray[i] != -1) {
        if (count === 1) {
          ret += `<span>${inputName[i]} = </span>
                              <span class="value moveSpace">'${inputArray[i]}'</span>`;
          count++;
        } else {
          ret += `<span class="in"> and </span>
                              <span>${inputName[i]} = </span>
                              <span class="value moveSpace">'${inputArray[i]}'</span>`;
        }
      }
    }
  } else {
    let count = 1;
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] != "X" && inputArray[i] != -1) {
        if (count === 1) {
          ret += `<span>${inputName[i]} = </span>
                              <span class="value moveSpace">"${inputArray[i]}"</span>`;
          count++;
        } else {
          ret += `<span class="in"> and </span>
                              <span>${inputName[i]} = </span>
                              <span class="value moveSpace">"${inputArray[i]}"</span>`;
        }
      }
    }
  }

  return ret;
}
