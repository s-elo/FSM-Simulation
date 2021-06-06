import $ from 'jquery';

// var $imgs = $("img");
// $.each($imgs, function (index, value) {
//   //console.log($(this).attr('src'));
//   var arr = $(this).attr("src").split("\\");
//   //console.log(arr);
//   var imgName = arr[arr.length - 1];
//   //console.log(imgName)
//   var imgPath = "../public/img/" + imgName;
//   console.log(imgPath);
//   $(this).attr("src", imgPath);
// });

// color
let storage = window.localStorage;
let currentcolor = "#e6e6e6";

if (storage.getItem("curColor")) {
  currentcolor = storage.getItem("curColor");
}
$("body").css("background-color", currentcolor);

$("nav ul").css("background-color", "black");

/** handle the nav collapse and open*/
// collapse or open the nav
$(".navbar-header button").click(() => {
  console.log("click", $(".navbar-header button"));

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
