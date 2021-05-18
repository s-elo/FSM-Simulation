import pointOnCircle from './pointOnCircle.js';
import getControlPoint from './getControlPoint.js';

export default function drawCurves(
  line,
  startIndex,
  endIndex,
  startX,
  startY,
  endX,
  endY,
  contrAngle,
  rotAngle,
  r
) {
  let scx = circleArray[startIndex].getAttribute("cx");
  let scy = circleArray[startIndex].getAttribute("cy");
  let ecx = circleArray[endIndex].getAttribute("cx");
  let ecy = circleArray[endIndex].getAttribute("cy");

  //for Tline
  let conStarPoint = pointOnCircle(scx, scy, startX, startY, rotAngle, R);
  let conSx = conStarPoint[0];
  let conSy = conStarPoint[1];

  let conEndPoint = pointOnCircle(ecx, ecy, endX, endY, -rotAngle, r);
  let conEx = conEndPoint[0];
  let conEy = conEndPoint[1];

  let controlPoint = getControlPoint(conSx, conSy, conEx, conEy, contrAngle);
  line.setAttribute(
    "d",
    "M" +
      conSx +
      " " +
      conSy +
      "Q" +
      controlPoint[0] +
      " " +
      controlPoint[1] +
      " " +
      conEx +
      " " +
      conEy
  );
}
