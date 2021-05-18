export default function bigCircleMouseEnter() {
  let i = this.getAttribute("id").slice(1, this.getAttribute("id").length);
  let circle = document.getElementById("c" + i);
  //this.style.stroke = enterColor;
  this.style.cursor = "crosshair";
  circle.style.stroke = enterColor;
}
