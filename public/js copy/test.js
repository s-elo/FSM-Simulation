import {
  setStartState,
  deleteClick,
  addState,
  clearAll,
} from "./design/btnClick/btnClick.js";
import { initStateDiagram } from "./dataHandler/dataHandler.js";

console.log("acall");
const addStateBtn = document.getElementById("addState");
const startBtn = document.getElementById("setStartState");
const deleteBtn = document.getElementById("delete");
const clearAllBtn = document.querySelector("#clearAll");

addStateBtn.addEventListener("click", addState);
startBtn.addEventListener("click", setStartState);
deleteBtn.addEventListener("click", deleteClick);
clearAllBtn.addEventListener("click", clearAll);

initStateDiagram();
