import stepOneClick from "./stepOneClick.js";
import valueWatch from "./valueWatch.js";

export default function paramSetting() {
  valueWatch();
  const stepOne = document.getElementById("stepOne");
  stepOne.addEventListener("click", stepOneClick);
}
