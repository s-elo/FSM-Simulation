const storage = window.localStorage;
// console.log(JSON.parse(storage.getItem('name')));
const simulData = JSON.parse(storage.getItem("data"));
// console.log(simulData);
/******************data above***********/
var changingflag = new Number();
changingflag = 0;
function switchmode1() {
  const element = document.getElementById("button1");
  if (element.innerHTML.match("one")) {
    element.innerHTML = "change mutiple periods";
  } else if (element.innerHTML.match("mutiple") && changingflag == 1) {
    element.innerHTML = "change mutiple periods";
    changingflag = 0;
  } else {
    element.innerHTML = "change one period";
    changingflag = 0;
  }
}
function switchmode2() {
  const element = document.getElementById("switch");
  if (element.innerHTML.match("cancel")) {
    element.innerHTML = "switch changing mode";
  }
}
function switchmode() {
  switchmode1();
  switchmode2();
}

document.querySelector("#switch").addEventListener("click", switchmode);

//按键功能
class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //用来记录画笔的横纵坐标
  }
}
var startState = simulData.start - 1;

var entityName = simulData.entityName;

var inputNum = simulData.inputNum;

var outputNum = simulData.outputNum;

var stateNumber = simulData.stateNumber;

var inputName = simulData.inputName;
var outputName = simulData.outputName;
var inputTypeVal = new Array(inputNum);
//变量声明-1-保留
for (let i = 0; i < inputNum; i++) {
  inputTypeVal[i] = simulData.inputTypeVal;
}

var outputTypeVal = new Array(outputNum);
for (let i = 0; i < outputNum; i++) {
  outputTypeVal[i] = simulData.outputTypeVal;
}

var inputFromVal = new Array(inputNum);
for (let i = 0; i < inputNum; i++) {
  inputFromVal[i] = simulData.inputFromVal;
}

var outputFromVal = new Array(outputNum);
for (let i = 0; i < outputNum; i++) {
  outputFromVal[i] = simulData.outputFromVal;
}
//预设不保留
const period = 20;
const width = 4,
  interval = 3;
var inputvale = new Array(inputNum);
for (let i = 0; i < inputNum; i++) {
  inputvale[i] = new Array(period);
  if (inputTypeVal[i] == "bit") {
    for (let j = 0; j < period; j++) {
      inputvale[i][j] = "1";
    }
  } else {
    for (let j = 0; j < period; j++) {
      inputvale[i][j] = "0";
      for (let k = 0; k < inputFromVal[i]; k++)
        inputvale[i][j] = inputvale[i][j] + "0";
    }
  }
}
var indiction = {};
for (let i = 0; i < inputNum; i++) {
  indiction[inputName[i]] = inputvale[i];
}
//设置字典存放输入变量值-保留
var outputvale = new Array(outputNum);
for (let i = 0; i < outputNum; i++) {
  outputvale[i] = new Array(period);
  if (outputTypeVal[i] == "bit") {
    for (let j = 0; j < period; j++) {
      outputvale[i][j] = "0";
    }
  } else {
    for (let j = 0; j < period; j++) {
      outputvale[i][j] = "0";
      for (let k = 0; k < outputFromVal[i]; k++)
        outputvale[i][j] = outputvale[i][j] + "0";
    }
  }
}
var outdiction = {};
for (let i = 0; i < outputNum; i++) {
  outdiction[outputName[i]] = outputvale[i];
}
//设置字典存放输出变量值-保留
var statediction = new Array(period);
for (let i = 0; i < period; i++) {
  statediction[i] = startState;
}
//设置存放每个周期当前状态的数组
let Tline = simulData.Tline;

let inputCondition = simulData.inputCondition;

let outputForEachTran = simulData.outputForEachTran;

var outputorig = new Array(outputNum);
outputorig[0] = "00";

function canvasInit() {
  //初始化画布
  let output = document.getElementById("output");
  for (let i = 0; i < outputNum; i++) {
    let c = document.createElement("canvas");
    output.appendChild(c);
    c.id = "output" + i.toString();
    c.width = "1800";
    c.height = "120";
  } //初始化绘制所有输出需要的画布

  let input = document.getElementById("input");
  for (let i = 0; i < inputNum; i++) {
    let c = document.createElement("canvas");
    input.appendChild(c);
    c.id = "input" + i.toString();
    c.width = "1800";
    c.height = "120";
  } //初始化绘制所有输入变量需要的画布
}
function drawTime(color, linewidth) {
  //绘制时间刻度的图形
  let canvas, ctx, t;
  for (let i = 0; i < period; i++) {
    canvas = document.getElementById("canvasTime");
    ctx = canvas.getContext("2d");
    t = i * 100;
    ctx.fillText(t.toString() + "ns", 185 + i * 70, 65);
    ctx.moveTo(200 + i * 70, 100);
    ctx.setLineDash([]);
    ctx.lineTo(200 + i * 70, 80);
  }
  ctx.moveTo(200, 100);
  ctx.lineTo(1600, 100);
  ctx.strokeStyle = color;
  ctx.lineWidth = linewidth;
  ctx.stroke();
}
function drawClk(color, linewidth) {
  //绘制整个clk的图形
  let canvas, ctx;
  canvas = document.getElementById("canvasCLK");
  ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.font = "30px serif";
  ctx.fillText("clk", 100, 100);
  ctx.lineWidth = linewidth;
  ctx.moveTo(200, 100);
  ctx.setLineDash([]);

  for (let i = 1; i <= period * 2; i += 2) {
    ctx.lineTo(200 + i * 35, 100);
    ctx.lineTo(200 + i * 35, 65);
    ctx.lineTo(200 + (i + 1) * 35, 65);
    ctx.lineTo(200 + (i + 1) * 35, 100);
  }
  ctx.strokeStyle = color;
  ctx.stroke();
}
function drawInput(color, linewidth) {
  //绘制所有输入变量的图形
  let canvas = new Array(inputNum);
  let ctx = new Array(inputNum);
  let pos = new Array(inputNum);

  for (let i = 0; i < inputNum; i++) {
    canvas[i] = document.getElementById("input" + i.toString());
    ctx[i] = canvas[i].getContext("2d");
    ctx[i].beginPath();
    ctx[i].font = "30px serif";
    ctx[i].strokeStyle = color;
    ctx[i].fillStyle = color;
    let inp = inputName[i];
    ctx[i].fillText(inp, 50, 100);
    ctx[i].lineWidth = linewidth;
    ctx[i].setLineDash([]);
    if (inputTypeVal[i] == "bit") {
      pos[i] = new Pos(200, 100 - indiction[inp][0] * 35);
      ctx[i].moveTo(pos[i].x, pos[i].y);
      pos[i].x += 70;
      ctx[i].lineTo(pos[i].x, pos[i].y);
      for (let j = 1; j < period; j++) {
        if (indiction[inp][j] != indiction[inp][j - 1]) {
          if (indiction[inp][j] > indiction[inp][j - 1]) {
            pos[i].y -= 35;
          } else if (indiction[inp][j] < indiction[inp][j - 1]) {
            pos[i].y += 35;
          }
          ctx[i].lineTo(pos[i].x, pos[i].y);
          pos[i].x += 70;
          ctx[i].lineTo(pos[i].x, pos[i].y);
        } else {
          pos[i].x += 70;
          ctx[i].lineTo(pos[i].x, pos[i].y);
        }
      }
      ctx[i].stroke();
    }
    //一位输入变量的绘制模式
    else {
      ctx[i].moveTo(200, 65);
      ctx[i].lineTo(260, 65);
      ctx[i].moveTo(200, 100);
      ctx[i].lineTo(260, 100);
      for (let j = 1; j < period; j++) {
        ctx[i].moveTo(280 + (j - 1) * 70, 65);
        ctx[i].lineTo(260 + j * 70, 65);
        ctx[i].moveTo(280 + (j - 1) * 70, 100);
        ctx[i].lineTo(260 + j * 70, 100);
      }
      for (let m = 1; m < period; m++) {
        if (indiction[inp][m] != indiction[inp][m - 1]) {
          ctx[i].moveTo(260 + (m - 1) * 70, 65);
          ctx[i].lineTo(280 + (m - 1) * 70, 100);
          ctx[i].moveTo(260 + (m - 1) * 70, 100);
          ctx[i].lineTo(280 + (m - 1) * 70, 65);
        } else {
          ctx[i].moveTo(260 + (m - 1) * 70, 65);
          ctx[i].lineTo(280 + (m - 1) * 70, 65);
          ctx[i].moveTo(260 + (m - 1) * 70, 100);
          ctx[i].lineTo(280 + (m - 1) * 70, 100);
        }
      }
      for (let n = 0; n < period; n++) {
        ctx[i].fillText(
          indiction[inp][n],
          225 - inputFromVal[i] * 10 + n * 70,
          90
        );
      }
      ctx[i].stroke();
    }
    //多位输入变量的绘制模式
  }
}
function drawOutputName() {
  //绘制所有状态的名称
  let canvas, ctx;
  for (let i = 0; i < outputNum; i++) {
    canvas = document.getElementById("output" + i.toString());
    ctx = canvas.getContext("2d");
    ctx.font = "30px serif";
    ctx.fillText(outputName[i], 50, 100);
  }
  ctx.stroke();
}

function drawState(color, linewidth) {
  let canvas, ctx;
  canvas = document.getElementById("canvasState");
  ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.font = "30px serif";
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.fillText("currentState", 0, 100);
  ctx.lineWidth = linewidth;
  ctx.setLineDash([]);
  ctx.moveTo(200, 65);
  ctx.lineTo(260, 65);
  ctx.moveTo(200, 100);
  ctx.lineTo(260, 100);
  for (let j = 1; j < period; j++) {
    ctx.moveTo(280 + (j - 1) * 70, 65);
    ctx.lineTo(260 + j * 70, 65);
    ctx.moveTo(280 + (j - 1) * 70, 100);
    ctx.lineTo(260 + j * 70, 100);
  }
  let flag = new Number();
  for (let i = 1; i < period; i++) {
    for (let j = 0; j < stateNumber; j++) {
      flag = 1;
      for (let k = 0; k < inputNum; k++) {
        if (
          indiction[inputName[k]][i - 1] ==
          inputCondition[statediction[i - 1] + 1][j + 1][k]
        ) {
          flag = flag * 1;
        } else if (inputCondition[statediction[i - 1] + 1][j + 1][k] == "X") {
          flag = flag * 1;
        } else {
          flag = flag * 0;
        }
      }
      if (flag == 1) {
        statediction[i] = j;
        for (let m = 0; m < outputNum; m++) {
          outdiction[outputName[m]][i] =
            outputForEachTran[statediction[i - 1] + 1][j + 1][m];
        }
        break;
      } else if (j == stateNumber - 1) {
        statediction[i] = statediction[i - 1];
        outdiction[i] = outdiction[i - 1];
      }
    }
  }
  for (let i = 1; i < period; i++) {
    if (statediction[i] != statediction[i - 1]) {
      ctx.moveTo(260 + (i - 1) * 70, 65);
      ctx.lineTo(280 + (i - 1) * 70, 100);
      ctx.moveTo(260 + (i - 1) * 70, 100);
      ctx.lineTo(280 + (i - 1) * 70, 65);
    } else {
      ctx.moveTo(260 + (i - 1) * 70, 65);
      ctx.lineTo(280 + (i - 1) * 70, 65);
      ctx.moveTo(260 + (i - 1) * 70, 100);
      ctx.lineTo(280 + (i - 1) * 70, 100);
    }
  }
  ctx.font = "15px serif";
  for (let i = 0; i < period; i++) {
    ctx.fillText(simulData.stateName[statediction[i]], 210 + i * 70, 90);
  }
  ctx.stroke();
}

function drawInit() {
  //整体初始化
  drawTime("black", 3);
  drawClk("black", 3);
  drawInput("black", 2);
  drawState("black", 2);
  drawOutputName();
  //从上到下依次绘制：时间刻度，clk，输入变量，状态的名称，进行全部的初始化工作
}

function drawOutput(color, linewidth) {
  //绘制所有状态的图像
  //参数的意义从左到右依次为：线条颜色，线条宽度，初始状态，初始时间，有限状态机。
  let canvas = new Array(outputNum);
  let ctx = new Array(outputNum);
  let pos = new Array(outputNum);

  for (let i = 0; i < outputNum; i++) {
    canvas[i] = document.getElementById("output" + i.toString());
    ctx[i] = canvas[i].getContext("2d");
    ctx[i].beginPath();
    ctx[i].font = "30px serif";
    ctx[i].strokeStyle = color;
    ctx[i].fillStyle = color;
    let outp = outputName[i];
    ctx[i].fillText(outp, 50, 100);
    ctx[i].lineWidth = linewidth;
    ctx[i].setLineDash([]);
    if (outputTypeVal[i] == "bit") {
      pos[i] = new Pos(200, 100 - outdiction[outp][0] * 35);
      ctx[i].moveTo(pos[i].x, pos[i].y);
      pos[i].x += 70;
      ctx[i].lineTo(pos[i].x, pos[i].y);
      for (let j = 1; j < period; j++) {
        if (outdiction[outp][j] != outdiction[outp][j - 1]) {
          if (outdiction[outp][j] > outdiction[outp][j - 1]) {
            pos[i].y -= 35;
          } else if (outdiction[outp][j] < outdiction[outp][j - 1]) {
            pos[i].y += 35;
          }
          ctx[i].lineTo(pos[i].x, pos[i].y);
          pos[i].x += 70;
          ctx[i].lineTo(pos[i].x, pos[i].y);
        } else {
          pos[i].x += 70;
          ctx[i].lineTo(pos[i].x, pos[i].y);
        }
      }
      ctx[i].stroke();
    }
    //一位输入变量的绘制模式
    else {
      ctx[i].moveTo(200, 65);
      ctx[i].lineTo(260, 65);
      ctx[i].moveTo(200, 100);
      ctx[i].lineTo(260, 100);
      for (let j = 1; j < period; j++) {
        ctx[i].moveTo(280 + (j - 1) * 70, 65);
        ctx[i].lineTo(260 + j * 70, 65);
        ctx[i].moveTo(280 + (j - 1) * 70, 100);
        ctx[i].lineTo(260 + j * 70, 100);
      }
      for (let m = 1; m < period; m++) {
        if (outdiction[outp][m] != outdiction[outp][m - 1]) {
          ctx[i].moveTo(260 + (m - 1) * 70, 65);
          ctx[i].lineTo(280 + (m - 1) * 70, 100);
          ctx[i].moveTo(260 + (m - 1) * 70, 100);
          ctx[i].lineTo(280 + (m - 1) * 70, 65);
        } else {
          ctx[i].moveTo(260 + (m - 1) * 70, 65);
          ctx[i].lineTo(280 + (m - 1) * 70, 65);
          ctx[i].moveTo(260 + (m - 1) * 70, 100);
          ctx[i].lineTo(280 + (m - 1) * 70, 100);
        }
      }
      for (let n = 0; n < period; n++) {
        ctx[i].fillText(
          outdiction[outp][n],
          225 - outputFromVal[i] * 10 + n * 70,
          90
        );
      }
      ctx[i].stroke();
    }
  }
}
function drawLineDash(ctx, start, end) {
  //绘制虚线
  ctx.setLineDash([width, interval]);
  for (let i = 0; i < period; i++) {
    ctx.moveTo(200 + i * 70, start);
    ctx.lineTo(200 + i * 70, end);
  }
  ctx.stroke();
}
function drawGrid() {
  //绘制整张图的虚线
  let canvas = document.getElementById("canvasTime");
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  drawLineDash(ctx, 100, 120);
  canvas = document.getElementById("canvasCLK");
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  drawLineDash(ctx, 0, 120);
  canvas = document.getElementById("canvasState");
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  drawLineDash(ctx, 0, 120);
  for (let i = 0; i < inputNum; i++) {
    canvas = document.getElementById("input" + i.toString());
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    drawLineDash(ctx, 0, 120);
  }
  for (let i = 0; i < outputNum; i++) {
    canvas = document.getElementById("output" + i.toString());
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    drawLineDash(ctx, 0, 120);
  }
}
function drawGridInOut() {
  let canvas, ctx;
  canvas = document.getElementById("canvasState");
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  drawLineDash(ctx, 0, 120);
  for (let i = 0; i < inputNum; i++) {
    canvas = document.getElementById("input" + i.toString());
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    drawLineDash(ctx, 0, 120);
  }
  for (let i = 0; i < outputNum; i++) {
    canvas = document.getElementById("output" + i.toString());
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    drawLineDash(ctx, 0, 120);
  }
}

function clearCanvas() {
  let canvas, ctx;
  canvas = document.getElementById("canvasState");
  ctx = canvas.getContext("2d");
  canvas.height = canvas.height;
  for (let i = 0; i < inputNum; i++) {
    canvas = document.getElementById("input" + i.toString());
    ctx = canvas.getContext("2d");
    canvas.height = canvas.height;
  }
  for (let i = 0; i < outputNum; i++) {
    canvas = document.getElementById("output" + i.toString());
    ctx = canvas.getContext("2d");
    canvas.height = canvas.height;
  }
}

// function switchmode(){
// 	element=document.getElementById("button1");
// 	if(element.innerHTML.match("one")){
// 		element.innerHTML="change mutiple periods";
// 	}
// 	else{
// 		element.innerHTML="change one period";
// 		changingflag=0;
// 	}
// }
let startAndEndArr = [0, 0];

function bindInputCLick() {
  //将输入变量的部分添加点击判定，使其改变图像
  for (let i = 0; i < inputNum; i++) {
    let index = i;
    let canvas = document.getElementById("input" + i.toString());
    let ctx = canvas.getContext("2d");

    canvas.addEventListener(
      "click",
      function (e) {
        let mode = document.getElementById("button1").innerHTML.trim();
        if (inputTypeVal[index] == "bit") {
          if (mode == "change one period") {
            // console.log("mode: ", mode);

            clearCanvas();
            if (e.layerX >= 200) {
              let p = Math.floor((e.layerX - 200) / 70);
              if (indiction[inputName[index]][p] == 1)
                indiction[inputName[index]][p] = 0;
              else indiction[inputName[index]][p] = 1;
            }
            drawInput("black", 2);
            drawOutputName();
            drawState("black", 2);
            drawOutput("black", 2);
            drawGridInOut();
          } else if (mode == "change mutiple periods") {
            // console.log("mode: ", mode);

            const element = document.getElementById("switch");
            if (changingflag == 0) {
              //   console.log("changingflag1: ", changingflag);
              if (e.layerX >= 200) {
                startAndEndArr[0] = Math.floor((e.layerX - 200) / 70);
                changingflag = 1;
                element.innerHTML = "cancel";
              }
            } else if (changingflag == 1) {
              //   console.log("changingflag2: ", changingflag);
              clearCanvas();
              if (e.layerX >= 200) {
                startAndEndArr[1] = Math.floor((e.layerX - 200) / 70);

                let [p1, p2] = startAndEndArr;
                // console.log(p1, p2);

                if (p1 == p2) {
                  if (indiction[inputName[index]][p1] == 1)
                    indiction[inputName[index]][p1] = 0;
                  else indiction[inputName[index]][p1] = 1;
                } else if (p1 < p2) {
                  for (p1; p1 <= p2; p1++) {
                    if (indiction[inputName[index]][p1] == 1)
                      indiction[inputName[index]][p1] = 0;
                    else indiction[inputName[index]][p1] = 1;
                  }
                } else {
                  for (p2; p2 <= p1; p2++) {
                    if (indiction[inputName[index]][p2] == 1)
                      indiction[inputName[index]][p2] = 0;
                    else indiction[inputName[index]][p2] = 1;
                  }
                }
                changingflag = 0;
                element.innerHTML = "switch changing mode";
              }
              drawInput("black", 2);
              drawOutputName();
              drawState("black", 2);
              drawOutput("black", 2);
              drawGridInOut();
            }
          }
        } else {
          if (mode == "change one period") {
            // console.log("mode: ", mode);
            let judgeflag = new Number();
            judgeflag = 1;
            let newvalue = prompt("type the new value", "");
            // console.log(typeof newvalue, newvalue, newvalue.length);
            let vlength = new Number();
            vlength = newvalue.length;
            // console.log(vlength, inputFromVal[index]);
            if (vlength - 1 == inputFromVal[index]) {
              for (let j = 0; j < vlength; j++) {
                if (newvalue[j] == "0" || newvalue[j] == "1") {
                  judgeflag = judgeflag * 1;
                } else {
                  judgeflag = judgeflag * 0;
                }
              }
              if (judgeflag == 0) {
                alert("type the right fomat of the vaule (only '0' or '1')");
              }
            } else {
              judgeflag = judgeflag * 0;
              alert("the length of newvalue is wrong");
            }
            if (judgeflag == 1) {
              clearCanvas();
              if (e.layerX >= 200) {
                let p = Math.floor((e.layerX - 200) / 70);
                indiction[inputName[index]][p] = newvalue;
              }
              drawInput("black", 2);
              drawOutputName();
              drawState("black", 2);
              drawOutput("black", 2);
              drawGridInOut();
            }
          } else if (mode == "change mutiple periods") {
            // console.log("mode: ", mode);

            element = document.getElementById("switch");
            if (changingflag == 0) {
              //   console.log("changingflag1: ", changingflag);
              if (e.layerX >= 200) {
                startAndEndArr[0] = Math.floor((e.layerX - 200) / 70);
                changingflag = 1;
                element.innerHTML = "cancel";
              }
            } else if (changingflag == 1) {
              //   console.log("changingflag2: ", changingflag);
              let judgeflag = new Number();
              judgeflag = 1;
              let newvalue = prompt("type the new value", "");
              //   console.log(typeof newvalue, newvalue, newvalue.length);
              let vlength = new Number();
              vlength = newvalue.length;
              //   console.log(vlength, inputFromVal[index]);
              if (vlength - 1 == inputFromVal[index]) {
                for (let j = 0; j < vlength; j++) {
                  if (newvalue[j] == "0" || newvalue[j] == "1") {
                    judgeflag = judgeflag * 1;
                  } else {
                    judgeflag = judgeflag * 0;
                  }
                }
                if (judgeflag == 0) {
                  alert("type the right fomat of the vaule (only '0' or '1')");
                }
              } else {
                judgeflag = judgeflag * 0;
                alert("the length of newvalue is wrong");
              }
              if (judgeflag == 1) {
                clearCanvas();
                if (e.layerX >= 200) {
                  startAndEndArr[1] = Math.floor((e.layerX - 200) / 70);

                  let [p1, p2] = startAndEndArr;
                  //   console.log(p1, p2);

                  if (p1 == p2) {
                    indiction[inputName[index]][p1] = newvalue;
                  } else if (p1 < p2) {
                    for (p1; p1 <= p2; p1++) {
                      indiction[inputName[index]][p1] = newvalue;
                    }
                  } else {
                    for (p2; p2 <= p1; p2++) {
                      indiction[inputName[index]][p2] = newvalue;
                    }
                  }
                  changingflag = 0;
                  element.innerHTML = "switch changing mode";
                }
                drawInput("black", 2);
                drawOutputName();
                drawState("black", 2);
                drawOutput("black", 2);
                drawGridInOut();
              }
            }
          }
        }
      },
      false
    );
  }
}

document.getElementById("title").innerHTML = entityName;
canvasInit(); //首先在网页上根据输入变量和状态的数量添加好画布标签
drawInit(); //进行基本的初始化
drawOutput("black", 2); //绘制图像
drawGrid(); //在整张图上画出虚线
bindInputCLick(); //将输入变量绑定点击事件
