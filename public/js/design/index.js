import {
  setStartState,
  deleteClick,
  addState,
  clearAll,
  addNew,
  save
} from "./btnClick/btnClick.js";
import { initStateDiagram } from "../dataHandler/dataHandler.js";
import paramSetting from "./parameterSetting/paramSetting.js";
import preset from "./preset.js";
import clearStateDiagram from "../dataHandler/clearStateDiagram.js";

export default function design() {
  const addStateBtn = document.getElementById("addState");
  const startBtn = document.getElementById("setStartState");
  const deleteBtn = document.getElementById("delete");
  const clearAllBtn = document.querySelector("#clearAll");
  const addNewBtn = document.querySelector("#addNew");
  const saveBtn = document.querySelector("#save");

  addStateBtn.addEventListener("click", addState);
  startBtn.addEventListener("click", setStartState);
  deleteBtn.addEventListener("click", deleteClick);
  clearAllBtn.addEventListener("click", clearAll);
  addNewBtn.addEventListener('click', addNew);
  saveBtn.addEventListener('click', save);
  
  preset();

  paramSetting();

  // has logined, get the data of the account if the data is valid
  if (window.accountInfo.accountName && window.accountInfo.data) {
    const parseData = JSON.parse(window.accountInfo.data);
    if (parseData.stateNumber) {
      initStateDiagram(parseData);
    }
  } else {
    // no account, see if there is the data
    const data = localStorage.getItem("data");

    if (data) {
      const parseData = JSON.parse(data);
      if (parseData.stateNumber) {
        initStateDiagram(parseData);
      }
    }
  }
}
