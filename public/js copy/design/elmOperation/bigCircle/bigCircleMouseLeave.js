export default function bigCircleMouseLeave() {
  let i = this.getAttribute("id").slice(1, this.getAttribute("id").length);
  let circle = document.getElementById("c" + i);
  //this.style.stroke = leaveColor;
  circle.style.stroke = leaveColor;
}
