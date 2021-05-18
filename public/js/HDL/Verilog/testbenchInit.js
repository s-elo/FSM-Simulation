export default function VerilogtestBenchInit() {
  // copy and <<< button
  $(".VerilogTestBench").hover(
    function () {
      $("#VerilogTestBenchCopy").css("display", "block");
      $("#TestBenchToVerilog").css("display", "block");
    },
    function () {
      $("#VerilogTestBenchCopy").css("display", "none");
      $("#TestBenchToVerilog").css("display", "none");
    }
  );

  $(".codeArea .VerilogTestBench").scroll(function () {
    // console.log($(this).scrollTop(), $(this).scrollLeft());//number
    $("#VerilogTestBenchCopy").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 10 + $(this).scrollTop() + "px",
    });

    /**
     * lineNumber and scroll
     */
    $(".VerilogTestBench .pre-numbering").css({
      left: 0 + $(this).scrollLeft() + "px", //px
    });

    $("#TestBenchToVerilog").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 450 + $(this).scrollTop() + "px",
    });
  });
}
