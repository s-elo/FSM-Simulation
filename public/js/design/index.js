import {
  setStartState,
  deleteClick,
  addState,
  clearAll,
  addNew,
  save,
} from "./btnClick/btnClick.js";
import { initStateDiagram } from "../dataHandler/dataHandler.js";
import paramSetting from "./parameterSetting/paramSetting.js";
import preset from "./preset.js";

export default async function design() {
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
  addNewBtn.addEventListener("click", addNew);
  saveBtn.addEventListener("click", save);

  preset();

  paramSetting();

  const data = localStorage.getItem("data");

  if (data) {
    const parseData = JSON.parse(data);
    if (parseData.stateNumber) {
      initStateDiagram(parseData);
    }
  } else {
    // no local data and has logined
    if (localStorage.getItem("token")) {
      const fsm = await getFSM(data[0]);

      localStorage.setItem("data", fsm);

      initStateDiagram(parseData);
    }
  }
}
