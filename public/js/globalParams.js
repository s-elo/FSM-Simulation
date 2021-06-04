import $ from "jquery";
import ClipboardJS from 'clipboard';

window.ClipboardJS = ClipboardJS;
window.$ = $;

window.svgNS = "http://www.w3.org/2000/svg";
window.svg = document.getElementById("svg");
window.svgWidth = svg.getAttribute("width");
window.svgHeight = svg.getAttribute("height");

window.CX = "100";
window.CY = "200";
window.R = "40";
window.BR = "50";
window.textFontSize = "20";
window.enterColor = "blue";
window.leaveColor = "black";
window.controlAngle = 20;
window.rotateAngle = 15;
window.limStateNumber = 11;

window.stateNumber = 0;
window.circleArray = [].fill(null);
window.bigCircleArray = [].fill(null);
window.textArray = [].fill(null);

window.Tline = []; //line(start state, end state)
for (let i = 0; i < limStateNumber; i++) {
  Tline[i] = new Array(limStateNumber).fill(0);
}

window.selfLinkAngle = [];

window.lineFlag = []; //record if the line being selected
for (let i = 0; i < limStateNumber; i++) {
  lineFlag[i] = new Array(limStateNumber).fill(0);
}

window.circleFlag = new Array(limStateNumber).fill(0); //record if the circle being selected

window.startState = new Array(limStateNumber).fill(0);

/*********************parameterSetting************************************/

window.stepOneFlag = 0;
window.finishFlag = 0;

// const inputRange = document.getElementById("inputRange");
// const outputRange = document.getElementById("outputRange");

window.updateFirstTime = 1;
/******************************************HDL*************************************/
window.lineNumber = 0;

window.entityName = "";

window.inputTypeFlag = 0;
window.outputTypeFlag = 0;

window.inputName = [];
window.outputName = [];

// let entityName = '';
window.inputNum = 0;
window.outputNum = 0;

window.inputTypeVal = "";
window.outputTypeVal = "";

window.inputFromVal = "";
window.inputToVal = "";
window.outputFromVal = "";
window.outputToVal = "";

window.stateName = [];

window.inputCondition = [];
window.outputForEachTran = [];

window.start = 0;

window.data = {};

/***********************account****************************/
// handle user info box
window.accountInfo = {};
