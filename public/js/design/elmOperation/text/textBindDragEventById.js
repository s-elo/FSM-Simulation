import {
  pointDistance,
  pointOnCircle,
  drawSelfCur,
  drawCurves,
} from "../../drag/drag.js";
import { updateData } from "../../../dataHandler/dataHandler.js";

export default function texBindDragEventById(id) {
  let text = document.getElementById(id);
  let groupIndex = id.slice(1, id.length);
  groupIndex = parseInt(groupIndex);
  let circle = document.getElementById("c" + groupIndex);
  let bigCircle = document.getElementById("C" + groupIndex);

  //change style
  text.onmouseenter = function () {
    circle.style.stroke = enterColor;
    //bigCircle.style.stroke = enterColor;
  };
  text.onmouseleave = function () {
    circle.style.stroke = leaveColor;
    //bigCircle.style.stroke = leaveColor;
  };

  text.onmousedown = function (event) {
    event = event || window.event;
    let dx = event.clientX - text.getAttribute("x");
    let dy = event.clientY - text.getAttribute("y");

    //change style
    // circle.setAttribute("r", parseInt(R)+5);
    // bigCircle.setAttribute("r", parseInt(BR)+5);

    document.onmousemove = function (event) {
      event = event || window.event;
      let left = event.clientX - dx;
      let top = event.clientY - dy;

      let cirLeft = left;
      let cirTop = top - textFontSize / 2 + 2;

      //deal with the boundary
      if (cirLeft <= bigCircle.getAttribute("r")) {
        cirLeft = bigCircle.getAttribute("r");
        left = cirLeft;
      }
      if (cirTop <= bigCircle.getAttribute("r")) {
        cirTop = bigCircle.getAttribute("r");
        //top = cirTop + textFontSize/2 - 2;
        top = 58;
      }
      if (svgWidth - cirLeft <= bigCircle.getAttribute("r")) {
        cirLeft = svgWidth - bigCircle.getAttribute("r");
        left = cirLeft;
      }
      if (svgHeight - cirTop <= bigCircle.getAttribute("r")) {
        cirTop = svgHeight - bigCircle.getAttribute("r");
        top = cirTop + textFontSize / 2 - 2;
      }

      //avoid overlap(only two)
      let elemIndex = parseInt(id.slice(1, id.length));
      //circlePosition[elemIndex] = [cirLeft, cirTop];

      if (stateNumber > 1) {
        for (let i = 1; i < stateNumber + 1; i++) {
          if (elemIndex != i) {
            let cir = document.getElementById("c" + i);
            let cirLeft1 = parseInt(cir.getAttribute("cx"));
            let cirTop1 = parseInt(cir.getAttribute("cy"));

            let dis = pointDistance(cirLeft, cirTop, cirLeft1, cirTop1);
            if (dis <= parseInt(2 * BR + 5)) {
              //similar triangle principle
              let offY = ((2 * BR + 5 - dis) / dis) * (cirTop1 - cirTop);
              let offX = ((2 * BR + 5 - dis) / dis) * (cirLeft1 - cirLeft);
              cirLeft = cirLeft - offX;
              cirTop = cirTop - offY;

              //boudary problem
              if (cirTop <= BR) {
                cirTop = BR;
                if (cirLeft >= cirLeft1) {
                  cirLeft =
                    cirLeft1 + Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
                } else {
                  cirLeft =
                    cirLeft1 - Math.sqrt((2 * BR) ** 2 - (cirTop1 - BR) ** 2);
                }
              }
              if (svgHeight - cirTop <= BR) {
                cirTop = svgHeight - BR;
                if (cirLeft >= cirLeft1) {
                  cirLeft =
                    cirLeft1 +
                    Math.sqrt((2 * BR) ** 2 - (svgHeight - BR - cirTop1) ** 2);
                } else {
                  cirLeft =
                    cirLeft1 -
                    Math.sqrt((2 * BR) ** 2 - (svgHeight - BR - cirTop1) ** 2);
                }
              }

              if (cirLeft <= BR) {
                cirLeft = BR;
                if (cirTop >= cirTop1) {
                  cirTop =
                    cirTop1 + Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
                } else {
                  cirTop =
                    cirTop1 - Math.sqrt((2 * BR) ** 2 - (cirLeft1 - BR) ** 2);
                }
              }
              if (svgWidth - cirLeft <= BR) {
                cirLeft = svgWidth - BR;
                if (cirTop >= cirTop1) {
                  cirTop =
                    cirTop1 +
                    Math.sqrt((2 * BR) ** 2 - (svgWidth - BR - cirLeft1) ** 2);
                } else {
                  cirTop =
                    cirTop1 -
                    Math.sqrt((2 * BR) ** 2 - (svgWidth - BR - cirLeft1) ** 2);
                }
              }

              left = cirLeft;
              top = cirTop + textFontSize / 2 - 2;
              if (cirTop === bigCircle.getAttribute("r")) {
                top = 58;
              }
            }
          }
        }
      }

      text.setAttribute("x", left);
      text.setAttribute("y", top);

      circle.setAttribute("cx", cirLeft);
      circle.setAttribute("cy", cirTop);

      bigCircle.setAttribute("cx", cirLeft);
      bigCircle.setAttribute("cy", cirTop);

      //lines
      for (let i = 1; i <= stateNumber; i++) {
        //as a start circle
        if (Tline[groupIndex][i] != 0) {
          let cx = circleArray[i].getAttribute("cx");
          let cy = circleArray[i].getAttribute("cy");

          //if it is a selflink
          if (i === groupIndex) {
            let x = pointOnCircle(
              cx,
              cy,
              parseInt(cx) + R,
              cy,
              selfLinkAngle[i],
              R
            )[0];
            let y = pointOnCircle(
              cx,
              cy,
              parseInt(cx) + R,
              cy,
              selfLinkAngle[i],
              R
            )[1];

            drawSelfCur(Tline[groupIndex][i], cx, cy, x, y, i);
          } else {
            let dis = pointDistance(cx, cy, cirLeft, cirTop);

            let tr = parseInt(R) + 10; //give some space for arrow
            //(startX-cirleft)/(cx-cirleft) = R/dis
            //(startY-cirtop)/(cy-cirtop) = R/dis
            let startX = (R / dis) * (cx - cirLeft) + parseInt(cirLeft);
            let startY = (R / dis) * (cy - cirTop) + parseInt(cirTop);

            //(endX-cirLeft)/(cx-cirLeft) = (dis-tr)/dis
            //(endY-cirTop)/(cy-cirTop) = (dis-tr)/dis
            let endX = ((dis - tr) / dis) * (cx - cirLeft) + parseInt(cirLeft);
            let endY = ((dis - tr) / dis) * (cy - cirTop) + parseInt(cirTop);

            //if two links
            if (Tline[i][groupIndex] != 0) {
              drawCurves(
                Tline[groupIndex][i],
                groupIndex,
                i,
                startX,
                startY,
                endX,
                endY,
                controlAngle,
                rotateAngle,
                tr
              );

              //reverse
              startX = ((dis - R) / dis) * (cx - cirLeft) + parseInt(cirLeft);
              startY = ((dis - R) / dis) * (cy - cirTop) + parseInt(cirTop);
              endX = (tr / dis) * (cx - cirLeft) + parseInt(cirLeft);
              endY = (tr / dis) * (cy - cirTop) + parseInt(cirTop);
              drawCurves(
                Tline[i][groupIndex],
                i,
                groupIndex,
                startX,
                startY,
                endX,
                endY,
                controlAngle,
                rotateAngle,
                tr
              );
            } else {
              Tline[groupIndex][i].setAttribute(
                "d",
                "M" + startX + " " + startY + "L" + endX + " " + endY
              );
            }
          }
          continue;
        }
        //as a end circle
        if (Tline[i][groupIndex] != 0) {
          let cx = circleArray[i].getAttribute("cx");
          let cy = circleArray[i].getAttribute("cy");
          let dis = pointDistance(cx, cy, cirLeft, cirTop);

          let tr = parseInt(R) + 10; //give some space for arrow
          //(startX-cx)/(cirleft-cx) = R/dis
          //(startY-cy)/(cirtop-cy) = R/dis
          let startX = (R / dis) * (cirLeft - cx) + parseInt(cx);
          let startY = (R / dis) * (cirTop - cy) + parseInt(cy);

          //(endX-cx)/(cirLeft-cx) = (dis-tr)/dis
          //(endY-cy)/(cirTop-cy) = (dis-tr)/dis
          let endX = ((dis - tr) / dis) * (cirLeft - cx) + parseInt(cx);
          let endY = ((dis - tr) / dis) * (cirTop - cy) + parseInt(cy);

          Tline[i][groupIndex].setAttribute(
            "d",
            "M" + startX + " " + startY + "L" + endX + " " + endY
          );
        }
      }

      document.onmouseup = function () {
        //change style
        // circle.setAttribute("r", parseInt(R));
        // bigCircle.setAttribute("r", parseInt(BR));

        document.onmousemove = null;
        document.onmouseup = null;
        updateData();
      };
      return false;
    };
  };
}
