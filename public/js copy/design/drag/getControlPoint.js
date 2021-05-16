import pointDistance from './pointDistance.js';

export default function getControlPoint(startX, startY, endX, endY, angle) {
  let point = [];
  angle = angle * (Math.PI / 180);
  let a = pointDistance(startX, startY, endX, endY) / 2;
  let b = a / Math.cos(angle);
  //alert("a: "+a+" "+"b: "+b);
  let phase1 = Math.atan(Math.abs(startY - endY) / Math.abs(startX - endX));
  //alert("phase1:"+phase1);
  //alert("angle:"+angle);
  let phase2 = Math.abs(angle - phase1);
  //alert("phase2:"+phase2);
  if (startX < endX && startY < endY) {
    if (angle > phase1) {
      point[0] = startX + b * Math.cos(phase2);
      point[1] = startY - b * Math.sin(phase2);
    } else {
      point[0] = startX + b * Math.cos(phase2);
      point[1] = startY + b * Math.sin(phase2);
    }
  }

  if (startX > endX && startY > endY) {
    if (angle > phase1) {
      point[0] = startX - b * Math.cos(phase2);
      point[1] = startY + b * Math.sin(phase2);
    } else {
      point[0] = startX - b * Math.cos(phase2);
      point[1] = startY - b * Math.sin(phase2);
    }
  }

  if (startX > endX && startY < endY) {
    if (angle > phase1) {
      point[0] = endX + b * Math.cos(phase2);
      point[1] = endY + b * Math.sin(phase2);
    } else {
      point[0] = endX + b * Math.cos(phase2);
      point[1] = endY - b * Math.sin(phase2);
    }
  }

  if (startX < endX && startY > endY) {
    if (angle > phase1) {
      point[0] = endX - b * Math.cos(phase2);
      point[1] = endY - b * Math.sin(phase2);
    } else {
      point[0] = endX - b * Math.cos(phase2);
      point[1] = endY + b * Math.sin(phase2);
    }
  }
  return point;
}
