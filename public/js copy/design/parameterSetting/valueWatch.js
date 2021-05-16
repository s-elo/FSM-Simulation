export default function valueWatch() {
  const inputNumberId = document.getElementById("inputNumber");
  const outputNumberId = document.getElementById("outputNumber");

  const inputType = document.getElementById("inputType");
  const outputType = document.getElementById("outputType");

  const inputFrom = document.getElementById("inputFrom");
  const inputTo = document.getElementById("inputTo");
  const outputFrom = document.getElementById("outputFrom");
  const outputTo = document.getElementById("outputTo");
  
  inputNumberId.onchange = function () {
    if (this.value <= 0) {
      alert("at least one input");
      this.value = 1;
    }
  };
  outputNumberId.onchange = function () {
    if (this.value <= 0) {
      alert("at least one output");
      this.value = 1;
    }
  };
  inputType.onchange = function () {
    if (this.value === "bit") {
      inputRange.style.display = "none";
    }
    if (this.value === "bit_vector") {
      inputRange.style.display = "block";
    }
  };
  outputType.onchange = function () {
    if (this.value === "bit") {
      outputRange.style.display = "none";
    }
    if (this.value === "bit_vector") {
      outputRange.style.display = "block";
    }
  };

  inputFrom.onchange = function () {
    if (this.value <= 0) {
      alert("invalid range! please enter another range.");
      this.value = 1;
      return;
    }
  };

  inputTo.onchange = function () {
    if (this.value != 0) {
      alert("the lower bound should always be 0.");
      this.value = 0;
      return;
    }
  };

  outputFrom.onchange = function () {
    if (this.value <= 0) {
      alert("invalid range! please enter another range.");
      this.value = 1;
      return;
    }
  };

  outputTo.onchange = function () {
    if (this.value != 0) {
      alert("the lower bound should always be 0.");
      this.value = 0;
      return;
    }
  };
}
