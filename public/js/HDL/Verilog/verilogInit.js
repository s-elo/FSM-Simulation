export default function verilogInit() {
  $(".Verilog").fadeIn(1000);
  $(".VerilogTestBench").css("display", "none");

  $(".Verilog").hover(
    function () {
      $("#VerilogCopy").css("display", "block");
      $("#VerilogToTestBench").css("display", "block");
    },
    function () {
      $("#VerilogCopy").css("display", "none");
      $("#VerilogToTestBench").css("display", "none");
    }
  );

  $(".codeArea .Verilog").scroll(function () {
    // console.log($(this).scrollTop(), $(this).scrollLeft());//number
    $("#VerilogCopy").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 10 + $(this).scrollTop() + "px",
    });

    /**
     * lineNumber and scroll
     */
    $(".Verilog .pre-numbering").css({
      left: 0 + $(this).scrollLeft() + "px", //px
    });

    $("#VerilogToTestBench").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 450 + $(this).scrollTop() + "px",
    });
  });
}
