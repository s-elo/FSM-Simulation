import { updateData } from "../dataHandler/dataHandler.js";
import { reminder } from "../HDL/generatorUtils/generatorUtils.js";

export default function preset() {
  /**
   * position for quickaccess
   */
  $(".designPart").click(function () {
    $("body, html").animate(
      {
        scrollTop: 0,
      },
      800
    );
  });

  $(".codePart").click(function () {
    $("body, html").animate(
      {
        scrollTop: $(".codeContainer").offset().top,
      },
      800
    );
  });

  $(".simulPart").click(function () {
    if (reminder()) return;

    // get the data
    updateData();

    window.open("./simulator.html");
  });

  /** handle the nav collapse and open*/
  // collapse or open the nav
  $(".navbar-header button").click(() => {
    // console.log("click", $(".navbar-header button"));

    let $btn = $(".navbar-header button");
    let $navbar = $("#navbar");

    // before click it is collapsed
    if ($btn.hasClass("collapsed")) {
      $btn.attr("aria-expanded", "true");
      $navbar.attr("aria-expanded", "true");
    }
    // before click it is exspended
    else {
      $btn.attr("aria-expanded", "false");
      $navbar.attr("aria-expanded", "false");
    }

    $navbar.toggleClass("in");
    $btn.toggleClass("collapsed");
  });
}
