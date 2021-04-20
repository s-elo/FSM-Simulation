// handle user info box
const $userInfo = $(".user-info");
const $menu = $(".user-info-menu");
const $signUp = $(".sign-up");
const $signIn = $(".sign-in");
const $withoutLogin = $(".without-login");
const token = localStorage.getItem("token");

$userInfo.click(() => {
  const display = $menu.css("display");

  $menu.css({
    display: display === "none" ? "block" : "none",
  });
});

$signUp.click(() => {
  window.location.href = "register";
});

$signIn.click(() => {
  window.location.href = "login";
});

if (token) {
  $userInfo.css({
    display: "block",
  });

  $withoutLogin.css({
    display: "none",
  });
}

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

  window.open("/simulator");
});

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
