export default function VHDLtestBenchInit() {
  // copy and <<< button
  $(".VHDLTestBench").hover(
    function () {
      $("#VHDLTestBenchCopy").css("display", "block");
      $("#TestBenchToVHDL").css("display", "block");
    },
    function () {
      $("#VHDLTestBenchCopy").css("display", "none");
      $("#TestBenchToVHDL").css("display", "none");
    }
  );

  $(".codeArea .VHDLTestBench").scroll(function () {
    // console.log($(this).scrollTop(), $(this).scrollLeft());//number
    $("#VHDLTestBenchCopy").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 10 + $(this).scrollTop() + "px",
    });

    /**
     * lineNumber and scroll
     */
    $(".VHDLTestBench .pre-numbering").css({
      left: 0 + $(this).scrollLeft() + "px", //px
    });

    $("#TestBenchToVHDL").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 450 + $(this).scrollTop() + "px",
    });
  });
}
