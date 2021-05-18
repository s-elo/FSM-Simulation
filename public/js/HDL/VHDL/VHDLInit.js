export default function VHDLInit() {
  // inputTypeFlag = 0;
  // outputTypeFlag = 0;
  // inputName = [];
  // outputName = [];
  lineNumber = 0;

  // copy button
  $(".VHDL").hover(
    function () {
      $("#VHDLCopy").css("display", "block");
      $("#VHDLToTestBench").css("display", "block");
    },
    function () {
      $("#VHDLCopy").css("display", "none");
      $("#VHDLToTestBench").css("display", "none");
    }
  );

  $("#updateBtn").css("display", "block");
  $("#showBtn").css("display", "none");

  //clear the previous contents and change the bcg if it is the first time
  $(".content").css("background-color", "#eef0f4");
  $(".prettyprint").css("background-color", "#eef0f4");

  /**
   * copy operation
   */
  $(".codeArea .VHDL").scroll(function () {
    // console.log($(this).scrollTop(), $(this).scrollLeft());//number
    $("#VHDLCopy").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 10 + $(this).scrollTop() + "px",
    });

    /**
     * lineNumber and scroll
     */
    $(".VHDL .pre-numbering").css({
      left: 0 + $(this).scrollLeft() + "px", //px
    });

    $("#VHDLToTestBench").css({
      left: 460 + $(this).scrollLeft() + "px", //px
      top: 450 + $(this).scrollTop() + "px",
    });
  });
}
