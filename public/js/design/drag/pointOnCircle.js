//get the point on the circle turnning an angle relative to (x,y)
export default function pointOnCircle(cx, cy, x, y, angle, r) {
  const point = [];
  angle = angle * (Math.PI / 180);
  cx = parseInt(cx);
  cy = parseInt(cy);

  let phase1, phase2;
  if (x > cx) {
    phase1 = Math.atan((cy - y) / (x - cx));
  } else {
    phase1 = Math.atan((cy - y) / (x - cx)) + Math.PI;
  }
  phase2 = phase1 + angle;
  point[0] = cx + r * Math.cos(phase2);
  point[1] = cy - r * Math.sin(phase2);

  return point;
}
