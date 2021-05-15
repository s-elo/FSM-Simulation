// const svgNS = "http://www.w3.org/2000/svg";
// const svg = document.getElementById("svg");
// const svgWidth = svg.getAttribute("width");
// const svgHeight = svg.getAttribute("height");

const CX = "100";
const CY = "200";
const R = "40";
const BR = "50";
const textFontSize = "20";
const enterColor = "blue";
const leaveColor = "black";
const controlAngle = 20;
const rotateAngle = 15;
const limStateNumber = 11;

// const startBtn = document.getElementById("setStartState");
// const deleteBtn = document.getElementById("delete");
// const clearAllBtn = document.querySelector("#clearAll");

let stateNumber = 0;
let circleArray = [].fill(null);
let bigCircleArray = [].fill(null);
let textArray = [].fill(null);

let Tline = []; //line(start state, end state)
for (let i = 0; i < limStateNumber; i++) {
  Tline[i] = new Array(limStateNumber).fill(0);
}

let selfLinkAngle = [];

let lineFlag = []; //record if the line being selected
for (let i = 0; i < limStateNumber; i++) {
  lineFlag[i] = new Array(limStateNumber).fill(0);
}

let circleFlag = new Array(limStateNumber).fill(0); //record if the circle being selected

let startState = new Array(limStateNumber).fill(0);

/******************************************VHDL******************************* */
let lineNumber = 0;

let inputTypeFlag;
let outputTypeFlag;

let inputName = [];
let outputName = [];

// let entityName = '';
let inputNum = 0;
let outputNum = 0;

let inputTypeVal = "";
let outputTypeVal = "";

let inputFromVal = "";
let inputToVal = "";
let outputFromVal = "";
let outputToVal = "";

let stateName = [];

let inputCondition = [];
let outputForEachTran = [];

let start = 0;

let data = {};
