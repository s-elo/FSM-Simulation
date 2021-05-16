import { decToBinary } from "../../utils.js";

export default class VerilogTestBenchCode {
  constructor($VerilogTestBench, data) {
    this.$VerilogTestBench = $VerilogTestBench;
    this.data = data;
    this.lineNumber = 0;

    if (data.inputTypeVal === "bit") {
      this.typeFlagIn = 1;
      this.inputLength = 1;
      this.inputType = '<span class="Type">reg</span>';
    } else {
      this.typeFlagIn = 0;
      this.inputLength = parseInt(data.inputFromVal) + 1;
      this.inputType = `<span class="Type">reg [${
        this.inputLength - 1
      }:0]</span>`;
    }

    if (data.outputTypeVal === "bit") {
      this.typeFlagOut = 1;
      this.outputLength = 1;
      this.outputType = '<span class="Type">wire</span>';
    } else {
      this.typeFlagOut = 0;
      this.outputLength = parseInt(data.outputFromVal) + 1;
      this.outputType = `<span class="Type">wire [${
        this.outputLength - 1
      }:0]</span>`;
    }
  }

  addCode(content) {
    this.$VerilogTestBench.append(content);

    this.lineNumber = this.$VerilogTestBench.children().length;
    return this;
  }

  // area here is  $('.VerilogTestBench' .pre-numbering')
  lineNumShow(area) {
    area.css("display", "block");
    // show one more line
    for (let i = 1; i <= this.lineNumber + 1; i++) {
      area.append(`<li>${i}</li>`);
    }
  }

  inputDef() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">// inputs</span>
					   </span>`;

    // clk and reset
    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="Type">reg </span>
						<span>clk;</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="Type">reg </span>
						<span>reset;</span>
					</span>`;

    // inputs
    for (let i = 0; i < this.data.inputNum; i++) {
      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							${this.inputType}
							<span> ${this.data.inputName[i]};</span>
						</span>`;
    }

    content += `<span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  outputDef() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">// outputs</span>
					   </span>`;

    // outputs
    for (let i = 0; i < this.data.outputNum; i++) {
      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							${this.outputType}
							<span> ${this.data.outputName[i]};</span>
						</span>`;
    }

    content += `<span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  initUUT() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">// Instantiate the Unit Under Test (UUT)</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="entityName">${this.data.entityName} </span>
							<span>uut(</span>
					   </span>`;

    // clk and reset
    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>.clk(clk),</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>.reset(reset),</span>
					</span>`;

    // inputs declaration
    for (let i = 0; i < this.data.inputNum; i++) {
      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>.${this.data.inputName[i]}(${this.data.inputName[i]}),</span>
						</span>`;
    }

    // outputs declaration
    for (let i = 0; i < this.data.outputNum; i++) {
      // the last one
      if (i === this.data.outputNum - 1) {
        content += `<span class="lineBlock">
								<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<span>.${this.data.outputName[i]}(${this.data.outputName[i]}));</span>
							</span>`;
        break;
      }

      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>.${this.data.outputName[i]}(${this.data.outputName[i]}),</span>
						</span>`;
    }

    content += `<span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  initailPart() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord">initial begin</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="comment">// Initialize Inputs</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>clk = </span>
							<span class="value">0</span>
							<span class="moveSpace">;</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>reset = </span>
							<span class="value">1</span>
							<span class="moveSpace">;</span>
					   </span>`;

    let value = `<span class="value">0</span>`; // bit
    // bit_vector
    if (!this.typeFlagIn) {
      value = `<span class="value">${this.inputLength}'b${decToBinary(
        0,
        this.inputLength
      )}</span>`;
    }

    for (let i = 0; i < this.data.inputNum; i++) {
      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>${this.data.inputName[i]} = </span>
							${value}
							<span class="moveSpace">;</span>
						</span>`;
    }

    content += `<span class="lineBlock">&nbsp;</span>`;

    // wait some time for reseting
    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span class="comment">// wait for 20ns to finish the reset</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>#20;</span>
					</span>
					<span class="lineBlock">&nbsp;</span>`;

    // simulation
    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span class="comment">// Add stimulus here</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>reset = </span>
						<span class="value">0</span>
						<span class="moveSpace">;</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="keyWord">end</span>
					</span>
					<span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  simul() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">// every clock inputs plus one</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">// you can change by yourself</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord">always </span>
							<span>@ (</span>
							<span class="keyWord moveSpace">posedge </span>
							<span>clk)</span>
					   </span>
					    <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>{${this.data.inputName.join(", ")}} = {${this.data.inputName.join(
      ", "
    )}} + </span>
							<span class="value">1'b1</span>
							<span class="moveSpace">;</span>
					   </span>
					   <span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  clkProcess() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">// clock changes every 10ns</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord">always begin</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>#10 clk = ~clk;</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord">end</span>
					   </span>
					   <span class="lineBlock">
							<span class="keyWord">endmodule</span>
					   </span>`;

    this.addCode(content);
  }

  generateCode($lineNumArea) {
    // timescale
    this.addCode(`<span class="lineBlock">
						<span class="comment">// timescale</span>
					  </span>
					  <span class="lineBlock">
					    <span>\`</span>
						<span class="keyWord moveSpace">timescale </span>
						<span>1ns / 1ps</span>
					  </span>
					  <span class="lineBlock">&nbsp;</span>`);

    // moudle definition
    this.addCode(`<span class="lineBlock">
						<span class="keyWord">module </span>
						<span class="entityName">${this.data.entityName + "_Test"}</span>
						<span class="moveSpace">;</span>
					  </span>
					  <span class="lineBlock">&nbsp;</span>`);

    this.inputDef();
    this.outputDef();

    this.initUUT();

    this.initailPart();

    this.simul();

    this.clkProcess();

    this.lineNumShow($lineNumArea);
  }
}
