import VHDLBtnClick from "./VHDL/VHDLBtnClick.js";
import { reminder } from "./generatorUtils/generatorUtils.js";
import VHDLTestBenchCode from "./VHDL/Testbench.js";
import VHDLtestBenchInit from "./VHDL/testbenchInit.js";
import VerilogGenerator from "./Verilog/VerilogGenerator.js";
import verilogInit from "./Verilog/verilogInit.js";
import VerilogTestBenchCode from "./Verilog/Testbench.js";
import VerilogtestBenchInit from "./Verilog/testbenchInit.js";

export default function clickBind() {
  //make sure the height of the marks is the same as the lines
  $(window).on("resize", function () {
    const height = $(".VHDL .pre-numbering li").css("height"); //px

    $(".lineBlock").css("height", height);
  });

  $("#showBtn").click(() => {
    // check
    if (reminder()) return;

    // clear
    $(".content").html("");
    $(".pre-numbering").html("");

    // show VHDL code
    $("#VHDLBtn").trigger("click");
    // show Verilog code
    $("#verilogBtn").trigger("click");
    // generate VHDL testBench code
    $("#VHDLTestBenchBtn").trigger("click");
    // generate Verilog testBench code
    $("#verilogTestBenchBtn").trigger("click");
  });

  $("#updateBtn").click(function () {
    $("#showBtn").trigger("click");
  });

  /**************************VHDL**********************************/
  $("#VHDLBtn").click(VHDLBtnClick);

  $("#VHDLToTestBench").click(() => {
    $(".VHDLTestBench").fadeIn(1000);
    $(".VHDL").css("display", "none");
  });

  const clipboard = new ClipboardJS("#VHDLCopy");

  clipboard.on("success", function (e) {
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);
    // alert('successfully copied!');
    $("#copyReminder").fadeIn(500).fadeOut(3000);
    e.clearSelection();
  });

  clipboard.on("error", function (e) {
    alert("error！failed to copy");
  });

  /*********************VHDLtestbench ***********************/
  $("#VHDLTestBenchBtn").click(() => {
    VHDLtestBenchInit();

    const $VHDLTestBench = $(".VHDLTestBench code");
    const $lineNumArea = $(".VHDLTestBench .pre-numbering");

    const VHDLTestBenchGenerator = new VHDLTestBenchCode($VHDLTestBench, data);

    VHDLTestBenchGenerator.generateCode($lineNumArea);
  });

  $("#TestBenchToVHDL").click(() => {
    $(".VHDL").fadeIn(1000);
    $(".VHDLTestBench").css("display", "none");
  });

  const VHDLTestBenchCopy = new ClipboardJS("#VHDLTestBenchCopy");

  VHDLTestBenchCopy.on("success", function (e) {
    $("#copyReminder").fadeIn(500).fadeOut(3000);
    e.clearSelection();
  });

  VHDLTestBenchCopy.on("error", function (e) {
    alert("error！failed to copy");
  });

  /**************************Verilog****************************/
  $("#verilogBtn").click(() => {
    verilogInit();

    const $contentVerilog = $(".Verilog code");
    const $lineNumArea = $(".Verilog .pre-numbering");

    const verCodeGenerator = new VerilogGenerator($contentVerilog, data);

    verCodeGenerator.generateCode($lineNumArea);
  });

  $("#VerilogToTestBench").click(() => {
    // console.log('#VerilogToTestBench');
    $(".VerilogTestBench").fadeIn(1000);
    $(".Verilog").css("display", "none");
  });

  /**
   * copy operation
   */
  const VerilogCopy = new ClipboardJS("#VerilogCopy");

  VerilogCopy.on("success", function (e) {
    $("#copyReminder").fadeIn(500).fadeOut(3000);
    e.clearSelection();
  });

  VerilogCopy.on("error", function (e) {
    alert("error！failed to copy");
  });

  /**************************Verilog testbench **********************/
  $("#verilogTestBenchBtn").click(() => {
    VerilogtestBenchInit();

    const $VerilogTestBench = $(".VerilogTestBench code");
    const $lineNumArea = $(".VerilogTestBench .pre-numbering");

    const VerilogTestBenchGenerator = new VerilogTestBenchCode(
      $VerilogTestBench,
      data
    );

    VerilogTestBenchGenerator.generateCode($lineNumArea);
  });

  $("#TestBenchToVerilog").click(() => {
    $(".Verilog").fadeIn(1000);
    $(".VerilogTestBench").css("display", "none");
  });

  const VerilogTestBenchCopy = new ClipboardJS("#VerilogTestBenchCopy");

  VerilogTestBenchCopy.on("success", function (e) {
    $("#copyReminder").fadeIn(500).fadeOut(3000);
    e.clearSelection();
  });

  VerilogTestBenchCopy.on("error", function (e) {
    alert("error！failed to copy");
  });
}
