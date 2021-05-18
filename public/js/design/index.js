import {
  setStartState,
  deleteClick,
  addState,
  clearAll,
} from "./btnClick/btnClick.js";
import { initStateDiagram } from "../dataHandler/dataHandler.js";
import paramSetting from "./parameterSetting/paramSetting.js";
import preset from "./preset.js";

export default function design() {
  const addStateBtn = document.getElementById("addState");
  const startBtn = document.getElementById("setStartState");
  const deleteBtn = document.getElementById("delete");
  const clearAllBtn = document.querySelector("#clearAll");

  addStateBtn.addEventListener("click", addState);
  startBtn.addEventListener("click", setStartState);
  deleteBtn.addEventListener("click", deleteClick);
  clearAllBtn.addEventListener("click", clearAll);

  preset();

  paramSetting();

  initStateDiagram();
}
