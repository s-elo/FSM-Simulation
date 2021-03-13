class VerilogGenerator {
    constructor ($contentVerilog, data) {
        this.$contentVerilog = $contentVerilog;
        this.data = data;
        this.lineNumber = 0;
 
        if (data.inputTypeVal === 'bit') {
            this.typeFlagIn = 1;
            this.inputLength = 1;
        }
        else {
            this.typeFlagIn = 0;
            this.inputLength = parseInt(data.inputFromVal) + 1;
        }

        if (data.outputTypeVal === 'bit') {
            this.typeFlagOut = 1;
            this.outputLength = 1;
        }
        else {
            this.typeFlagOut = 0;
            this.outputLength = parseInt(data.outputFromVal) + 1;
        }
    }

    addCode (content) {
        this.$contentVerilog.append(content);

        // all the <span class="lineBlock">
        this.lineNumber = this.$contentVerilog.children().length;
        return this;
    }

    // area here is  $('.Verilog .pre-numbering')
    lineNumShow (area) {
        area.css('display', 'block');
        // show one more line
        for (let i = 1; i <= this.lineNumber + 1; i++) {
            area.append(`<li>${ i }</li>`);
        }
    }

    /***********add code iterms of different parts ***************/
    moduleDef () {
        let content = `<span class="lineBlock">
                            <span class="keyWord">module</span>
                            <span class="entityName">${ this.data.entityName }</span>
                            <span>(</span>
                            <span class="in moveSpace">input</span>
                            <span>clk, reset, </span>`;
        
        // input
        // bit type
        if (this.typeFlagIn) {
            for (let i = 0; i < this.data.inputNum; i++) {
                content += `<span>${ this.data.inputName[i] }, </span>`;
            }
        }
        // bit_vector type
        else {
            content += `<span class="Type">
                            reg [${ this.data.inputFromVal }:${this.data.inputToVal}]
                        </span>`;
            
            for (let i = 0; i < this.data.inputNum; i++) {
                content += `<span>${ this.data.inputName[i] }, </span>`;
            }
        }
        content += `</span>`;

        // output
        content += `<span class="lineBlock">
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <span class="in">output </span>`;
        // bit type
        if (this.typeFlagOut) {
            content += `<span class="Type">reg </span>`;
            for (let i = 0; i < this.data.outputNum; i++) {
                // the last one
                if (i === this.data.outputNum - 1) {
                    content += `<span>${ this.data.outputName[i] });</span>`;
                }
                else {
                    content += `<span>${ this.data.outputName[i] }, </span>`;
                }
            }
        }
        // bit_vector type
        else {
            content += `<span class="Type">
                            reg [${ this.data.outputFromVal }:${this.data.outputToVal}]
                        </span>`;
            
            for (let i = 0; i < this.data.outputNum; i++) {
                // the last one
                if (i === this.data.outputNum - 1) {
                    content += `<span>${ this.data.outputName[i] });</span>`;
                }
                else {
                    content += `<span>${ this.data.outputName[i] }, </span>`;
                }
            }
        }
        content += `</span>`;

        this.addCode(content);
    }

    stateTypeDef () {
        let regLength = Math.ceil(Math.log(this.data.stateNumber) / Math.LN2);
        // when just one state
        if (regLength === 0) regLength = 1;

        let content = ``;
        // only one state or two states
        if (regLength === 1) {
            content = `<span class="lineBlock">
                            <span class="Type">reg</span>
                            <span>pre, nextState;</span>
                       </span>`;
        }
        else {
            content = `<span class="lineBlock">
                            <span class="Type">reg [${ regLength - 1 }:0] </span>
                            <span>pre, nextState;</span>
                       </span>`;
        }
        
        content += `<span class="lineBlock">&#10;</span>`;

        // declare the states
        /**
         * for stateNumber = 3 => binaryArr = ['00', '01', '10']
         */
        let binaryArr = VerilogGenerator.decTobinaryArray(stateNumber, regLength);

        for (let i = 0; i < stateNumber; i++) {
            content += `<span class="lineBlock">
                            <span class="keyWord">parameter</span>
                            <span>${ this.data.stateName[i] } = </span>
                            <span class="value">${ regLength }'b${ binaryArr[i] }</span>
                            <span class="moveSpace">;</span>
                        </span>`;
        }

        this.addCode(content);
    }

    stateRegister () {
        let content = `<span class="lineBlock">
                            <span class="keyWord">always </span>
                            <span>@ (posedge clk, posedge reset)</span>
                       </span>
                       <span class="lineBlock">
                            <span>&nbsp;&nbsp;</span>
                            <span class="keyWord">if </span>
                            <span>(reset) pre <= ${ this.data.stateName[this.data.start - 1] };</span>
                       </span>
                       <span class="lineBlock">
                            <span>&nbsp;&nbsp;</span>
                            <span class="keyWord">else </span>
                            <span>pre <= nextState;</span>
                       </span>`;
        
        this.addCode(content);
    }

    nextStateLogic () {
        let content = `<span class="lineBlock">
                            <span class="keyWord">always </span>
                            <span>@ (*)</span>
                       </span>
                       <span class="lineBlock">
                            <span>&nbsp;&nbsp;</span>
                            <span class="keyWord">case </span>
                            <span>(pre)</span>
                       </span>`;
        
        for (let i = 1; i <= stateNumber; i++) {
            content += `<span class="lineBlock">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>${ this.data.stateName[i - 1] }: </span>
                            <span class="keyWord">begin</span>
                        </span>`;

            // moore type
            if (isElementEqual(this.data.outputForEachTran[i])) {
                content += this.mooreCode(i);
            }
            // mealy type
            else {
                content += this.mealyCode(i);
            }

            // if it is not the last one, add a blank line behind
            if (i != stateNumber) {
                content += `<span class="lineBlock">&#10;</span>`;
            }
        }

        this.addCode(content);
    }

    endCode () {
        this.addCode(`<span class="lineBlock">
                        <span>&nbsp;&nbsp;</span>
                        <span class="keyWord">endcase</span>
                      </span>
                      <span class="lineBlock">
                        <span class="keyWord">endmodule</span>
                      </span>`);
    }

    mooreCode (fromIndex) {
        let content = ``;

        let OutputHanldeFlag = 1;
        let flag = 1; // for check if using if or else if
        for (let i = 0; i < Tline[fromIndex].length; i++) {
            if (Tline[fromIndex][i] != 0) {
                // handle output
                // only handle once for moore type
                if (OutputHanldeFlag) {
                    content += this.outputCode(fromIndex, i, 'moore');
                    OutputHanldeFlag = 0;
                }
                
                // handle the transition
                // uncconditional (only one transition for this current state)
                if (isAllX(this.data.inputCondition[fromIndex][i])) {
                    content += `<span class="lineBlock">
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>nextState = ${ this.data.stateName[i - 1] };</span>
                                </span>`;
                    
                    break; // only one transition
                }
                // multiple transition for this current state
                else {
                    content += `${ this.conditionCode(this.data.inputCondition[fromIndex][i], flag) }
                                <span class="lineBlock">
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span class="keyWord">begin</span>
                                </span>
                                <span class="lineBlock">
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span>nextState = ${ this.data.stateName[i - 1] };</span>
                                </span>
                                <span class="lineBlock">
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span class="keyWord">end</span>
                                </span>`;
                    
                    if (flag) flag = 0; // after fist enter, it should be changed to 0
                }
            }
        }

        content += `<span class="lineBlock">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="keyWord">end</span>
                    </span>`
        return content;
    }

    mealyCode (fromIndex) {
        let content = ``;

        let flag = 1; // if or else if
        for (let i = 0; i < Tline[fromIndex].length; i++) {
            if (Tline[fromIndex][i]) {
                content += `${ this.conditionCode(this.data.inputCondition[fromIndex][i], flag) }
                            <span class="lineBlock">
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span class="keyWord">begin</span>
                            </span>
                            <span class="lineBlock">
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>nextState = ${ this.data.stateName[i - 1] };</span>
                            </span>
                            ${ this.outputCode(fromIndex, i, 'mealy') }
                            <span class="lineBlock">
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span class="keyWord">end</span>
                            </span>`;
            }
        }

        return content;
    }

    outputCode (fromIndex, fromTo, type) {
        let content = ``;

        for (let k = 0; k < this.data.outputNum; k++) {
            content += `<span class="lineBlock">`;

            if (type === 'moore') {
                content += `<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
            }
            else {
                content += `<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
            }

            content += `<span>${ this.data.outputName[k] } = </span>
                        <span class="value">${ this.outputLength }'b${ this.data.outputForEachTran[fromIndex][fromTo][k] }</span>
                        <span class="moveSpace">;</span>
                        </span>`;
        }       

        return content;
    }

    conditionCode (inputArray, flag) {
        let content = ``;

        // first one (if)
        if (flag) {
            content += `<span class="lineBlock">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span class="keyWord">if </span>
                            <span>(</span>`;
        }
        // not the first one (else if)
        else {
            content += `<span class="lineBlock">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span class="keyWord">else if </span>
                            <span>(</span>`;
        }

        let conditionArr = [];
        for (let i = 0; i < inputArray.length; i++) {
            // relevant inputs
            if ((inputArray[i] != 'X') && (inputArray[i] != -1)) {
                conditionArr.push(`<span>${ this.data.inputName[i] } == </span>
                                   <span class="value">${ this.inputLength }'b${ inputArray[i] }</span>`);
            }
        }
        content += conditionArr.join(`<span> && </span>`);

        content += `<span>)</span></span>`;

        return content;
    }

    generateCode ($lineNumArea) {
        // define the inputs and outputs
        this.addCode(`<span class="linBlock">
                        <span class="comment">// module definition</span>
                      </span>`);
    
        this.moduleDef();

        // define the states
        this.addCode(`<span class="lineBlock">&#10;</span>
                        <span class="linBlock">
                        <span class="comment">// define the states</span>
                      </span>`);

        this.stateTypeDef();

        // state register part
        this.addCode(`<span class="lineBlock">&#10;</span>
                        <span class="linBlock">
                        <span class="comment">// state register</span>
                      </span>`);
    
        this.stateRegister();

        // state transition behaviors
        this.addCode(`<span class="lineBlock">&#10;</span>
                        <span class="linBlock">
                        <span class="comment">// next state logic</span>
                      </span>`);
        
        this.nextStateLogic();

        this.endCode();

        this.lineNumShow($lineNumArea);
    }

    /*************************static methods************************/
    static decTobinaryArray (dec, reglen) {
        let ret = [];

        for (let i = 0; i < dec; i++) {
            ret.push(decToBinary(i, reglen));
        }

        return ret;
    }
}

$('#verilogBtn').click(() => {
    verilogInit();
    
    const $contentVerilog = $('.Verilog code');
    const $lineNumArea = $('.Verilog .pre-numbering');

    let verCodeGenerator = new VerilogGenerator($contentVerilog, data);

    verCodeGenerator.generateCode($lineNumArea);
});

function verilogInit() {
    // $('.Verilog .content').html('');
	// $('.Verilog .pre-numbering').html('');

    $('.Verilog').fadeIn(1000);
	$('.VerilogTestBench').css('display', 'none');

    $('.Verilog').hover(function () {
		$('#VerilogCopy').css('display', 'block');
		$('#VerilogToTestBench').css('display', 'block');
	}, function () {
		$('#VerilogCopy').css('display', 'none');
		$('#VerilogToTestBench').css('display', 'none');
	});
}

$('#VerilogToTestBench').click(() => {
    // console.log('#VerilogToTestBench');
    $('.VerilogTestBench').fadeIn(1000);
	$('.Verilog').css('display', 'none');
});

/**
 * copy operation
 */
$('.codeArea .Verilog').scroll(function () {
	// console.log($(this).scrollTop(), $(this).scrollLeft());//number
	$('#VerilogCopy').css({
		left: 460 + $(this).scrollLeft() + 'px',//px
		top: 10 + $(this).scrollTop() + 'px'
	});

    /**
 	* lineNumber and scroll
 	*/
	$('.Verilog .pre-numbering').css({
		left: 0 + $(this).scrollLeft() + 'px',//px
	});

    $('#VerilogToTestBench').css({
			left: 460 + $(this).scrollLeft() + 'px',//px
			top: 450 + $(this).scrollTop() + 'px'
	});
});

var VerilogCopy = new ClipboardJS('#VerilogCopy');

VerilogCopy.on('success', function(e) {
	$('#copyReminder').fadeIn(500).fadeOut(3000);
    e.clearSelection();
});

VerilogCopy.on('error', function(e) {
   alert('error！failed to copy');
});


