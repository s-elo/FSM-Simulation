import pointDistance from './pointDistance.js';
import pointOnCircle from './pointOnCircle.js';

export default function drawSelfCur(line, cx, cy, x, y, index) {
  cx = parseInt(cx);
  cy = parseInt(cy);
  //(cy-y)/(cy-endY)=dis(cx, cy, x, y)/R
  //(cx-x)/(cx-endX)=dis(cx, cy, x, y)/R
  let tr = parseInt(R) + 10;
  let endX = cx - ((cx - x) * tr) / pointDistance(cx, cy, x, y);
  let endY = cy - ((cy - y) * tr) / pointDistance(cx, cy, x, y);

  // record the angle of selflink line
  selfLinkAngle[index] = Math.atan((cy - endY) / (endX - cx)) * (180 / Math.PI);
  if (endX < cx) {
    selfLinkAngle[index] = selfLinkAngle[index] + 180;
  }
  let starPoint = pointOnCircle(cx, cy, endX, endY, 30, R);
  let startX = starPoint[0];
  let startY = starPoint[1];

  let Sphase = 10;
  let Ephase = -4;
  let r = parseInt(R) + 100;

  let startControl = pointOnCircle(cx, cy, startX, startY, Sphase, R);
  startControl[0] =
    cx -
    ((cx - startControl[0]) * r) /
      pointDistance(cx, cy, startControl[0], startControl[1]);
  startControl[1] =
    cy -
    ((cy - startControl[1]) * r) /
      pointDistance(cx, cy, startControl[0], startControl[1]);

  let endControl = pointOnCircle(cx, cy, endX, endY, Ephase, R);
  endControl[0] =
    cx -
    ((cx - endControl[0]) * r) /
      pointDistance(cx, cy, endControl[0], endControl[1]);
  endControl[1] =
    cy -
    ((cy - endControl[1]) * r) /
      pointDistance(cx, cy, endControl[0], endControl[1]);

  line.setAttribute(
    "d",
    "M" +
      startX +
      " " +
      startY +
      "C" +
      startControl[0] +
      " " +
      startControl[1] +
      " " +
      endControl[0] +
      " " +
      endControl[1] +
      " " +
      endX +
      " " +
      endY
  );
}
