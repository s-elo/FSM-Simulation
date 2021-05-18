import { decToBinary } from "../../utils.js";

export default class VHDLTestBenchCode {
  constructor($VHDLTestBench, data) {
    this.$VHDLTestBench = $VHDLTestBench;
    this.data = data;
    this.lineNumber = 0;

    if (data.inputTypeVal === "bit") {
      this.typeFlagIn = 1;
      this.inputLength = 1;
      this.inputType = '<span class="Type">bit</span>';
    } else {
      this.typeFlagIn = 0;
      this.inputLength = parseInt(data.inputFromVal);
      this.inputType = `<span class="Type">bit_vector(${this.inputLength} downto 0)</span>`;
    }

    if (data.outputTypeVal === "bit") {
      this.typeFlagOut = 1;
      this.outputLength = 1;
      this.outputType = '<span class="Type">bit</span>';
    } else {
      this.typeFlagOut = 0;
      this.outputLength = parseInt(data.outputFromVal);
      this.outputType = `<span class="Type">bit_vector(${this.outputLength} downto 0)</span>`;
    }
  }

  addCode(content) {
    this.$VHDLTestBench.append(content);

    this.lineNumber = this.$VHDLTestBench.children().length;
    return this;
  }

  // area here is  $('.VHDLTestBench' .pre-numbering')
  lineNumShow(area) {
    area.css("display", "block");
    // show one more line
    for (let i = 1; i <= this.lineNumber + 1; i++) {
      area.append(`<li>${i}</li>`);
    }
  }

  /***********add code iterms of different parts ***************/
  libsDef() {
    let content = `<span class="lineBlock">
							<span class="comment">-- using necessary libraries</span>
					   </span>
					   <span class="lineBlock">
							<span class="keyWord">library </span>
							<span>ieee;</span>
					   </span>
					   <span class="lineBlock">
							<span class="keyWord">use </span>
							<span>ieee.std_logic_1164.all;</span>
					   </span>
					   <span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  entityDef() {
    let content = `<span class="lineBlock">
							<span class="comment">-- testBench entity definition</span>
					   </span>
					   <span class="lineBlock">
							<span class="keyWord">entity </span>
							<span class="entityName">${this.data.entityName + "_Test"} </span>
							<span>is</span>
					   </span>
					   <span class="lineBlock">
							<span class="keyWord">end </span>
							<span class="entityName">${this.data.entityName + "_Test"}</span>
							<span class="moveSpace">;</span>
					   </span>
					   <span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  componentDeclar() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">-- Component Declaration for the Unit Under Test (UUT)</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord">component </span>
							<span class="entityName">${this.data.entityName}</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;</span>
					   		<span class="keyWord">port</span>
							<span class="moveSpace">(</span>
					   </span>`;

    // inputs declaration
    for (let i = 0; i < this.data.inputNum; i++) {
      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>${this.data.inputName[i]} : in </span>
							${this.inputType}
							<span class="moveSpace">;</span>
						</span>`;
    }

    // clk and reset
    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>clk : in </span>
						<span class="Type">bit</span>
						<span class="moveSpace">;</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>rst : in </span>
						<span class="Type">bit</span>
						<span class="moveSpace">;</span>
					</span>`;

    // outputs declaration
    for (let i = 0; i < this.data.outputNum; i++) {
      // the last one
      if (i === this.data.outputNum - 1) {
        content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>${this.data.outputName[i]} : out </span>
							${this.outputType}
							<span class="moveSpace">);</span>
						</span>`;
        break;
      }

      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>${this.data.outputName[i]} : out </span>
							${this.outputType}
							<span class="moveSpace">;</span>
						</span>`;
    }

    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="keyWord">end component</span>
						<span class="moveSpace">;</span>
					</span>
					<span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  inputSignal() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">-- inputs</span>
					   </span>`;

    // input
    for (let i = 0; i < this.data.inputNum; i++) {
      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord">signal </span>
							<span>${this.data.inputName[i]} : </span>
							${this.inputType}
							<span> := </span>`;

      if (this.typeFlagIn) {
        content += `<span class="value">'0'</span>
							<span class="moveSpace">;</span>
							</span>`;
      } else {
        content += `<span class="value">'${decToBinary(
          0,
          this.inputLength + 1
        )}'</span>
							<span class="moveSpace">;</span>
							</span>`;
      }
    }

    // clk and reset
    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="keyWord">signal </span>
						<span>clk : </span>
						<span class="Type">bit</span>
					    <span> := </span>
						<span class="value">'0'</span>
						<span class="moveSpace">;</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="keyWord">signal </span>
						<span>rst : </span>
						<span class="Type">bit</span>
					    <span> := </span>
						<span class="value">'1'</span>
						<span class="moveSpace">;</span>
					</span>
					<span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  outputSignal() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">-- outputs</span>
					   </span>`;

    // output
    for (let i = 0; i < this.data.outputNum; i++) {
      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord">signal </span>
							<span>${this.data.outputName[i]} : </span>
							${this.outputType}
							<span class="moveSpace">;</span>
						</span>`;
    }

    content += `<span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  initUUT() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">-- Instantiate the Unit Under Test (UUT)</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span>uut: </span>
							<span class="entityName">${this.data.entityName} </span>
							<span class="keyWord">port map</span>
							<span class="moveSpace">(</span>
					   </span>`;

    // inputs declaration
    for (let i = 0; i < this.data.inputNum; i++) {
      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>${this.data.inputName[i]} => ${this.data.inputName[i]},</span>
						</span>`;
    }

    // clk and reset
    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>clk => clk,</span>
					</span>
					<span class="lineBlock">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>rst => rst,</span>
					</span>`;

    // outputs declaration
    for (let i = 0; i < this.data.outputNum; i++) {
      // the last one
      if (i === this.data.outputNum - 1) {
        content += `<span class="lineBlock">
								<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<span>${this.data.outputName[i]} => ${this.data.outputName[i]});</span>
							</span>`;
        break;
      }

      content += `<span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>${this.data.outputName[i]} => ${this.data.outputName[i]},</span>
						</span>`;
    }

    content += `<span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  clkProcess() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">-- Clock process definitions</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;</span>
							<span>clk_process: </span>
							<span class="keyWord">process</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;</span>
							<span class="keyWord">begin</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>clk <= </span>
							<span class="value">'0'</span>
							<span class="moveSpace">;</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="keyWord">wait for </span>
							<span>clk_period/2;</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>clk <= </span>
							<span class="value">'1'</span>
							<span class="moveSpace">;</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="keyWord">wait for </span>
							<span>clk_period/2;</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;</span>
							<span class="keyWord">end process</span>
							<span class="moveSpace">;</span>
					   </span>
					   <span class="lineBlock">&nbsp;</span>`;

    this.addCode(content);
  }

  simulProcess() {
    let content = `<span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="comment">-- Stimulus process</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span>stim_proc: </span>
							<span class="keyWord">process</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;</span>
							<span class="keyWord">begin</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="comment">-- hold reset state for 20 ns</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="keyWord">wait for </span>
							<span>20 ns;</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>rst <= </span>
							<span class="value">'0'</span>
							<span class="moveSpace">;</span>
					   </span>
					   <span class="lineBlock">&nbsp;</span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="comment">-- insert stimulus here</span>
					   </span>
					   <span class="lineBlock">
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="comment">-- you can change the behaviour below</span>
					   </span>
					   <span class="lineBlock">
					   		<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span class="keyWord">wait for </span>
							<span>clk_period/2;</span>
					   </span>`;

    for (let i = 0; i < this.data.inputNum; i++) {
      content += `<span class="lineBlock">
					   		<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span>${this.data.inputName[i]} <= </span>
							<span class="keyWord">NOT </span>
							<span>${this.data.inputName[i]};</span>
					   </span>`;
    }

    content += `<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="keyWord">end process</span>
						<span class="moveSpace">;</span>
					</span>
					<span class="lineBlock">
						<span class="keyWord">end</span>
						<span class="moveSpace">;</span>
					</span>`;

    this.addCode(content);
  }

  generateCode($lineNumArea) {
    this.libsDef();

    this.entityDef();

    // the first line of architecture
    this.addCode(`<span class="lineBlock">
						<span class="keyWord">architecture </span>
						<span class="entityName">behavior </span>
						<span>of </span>
						<span class="entityName">${this.data.entityName + "_Test"} </span>
						<span>is</span>
					  </span>`);

    this.componentDeclar();

    this.inputSignal();
    this.outputSignal();

    // Clock period definitions
    this.addCode(`<span class="lineBlock">
						<span>&nbsp;&nbsp;</span>
						<span class="comment">-- Clock period definitions</span>
					  </span>
					  <span class="lineBlock">
					  	<span>&nbsp;&nbsp;</span>
						<span class="keyWord">constant </span>
						<span>clk_period : time := 10 ns;</span>
					  </span>
					  <span class="lineBlock">&nbsp;</span>
					  <span class="lineBlock">
					  	<span>&nbsp;&nbsp;</span>
					  	<span class="keyWord">begin</span>
					  </span>
					  <span class="lineBlock">&nbsp;</span>`);

    this.initUUT();

    this.clkProcess();

    this.simulProcess();

    this.lineNumShow($lineNumArea);
  }
}
