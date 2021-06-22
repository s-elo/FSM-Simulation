import verifyToken from "./verifyToken.js";
import interceptor from "./interceptor.js";

const $userInfo = $(".user-info");
const $menu = $(".user-info-menu");
const $signUp = $(".sign-up");
const $signIn = $(".sign-in");
const $loginOut = $(".login-out");

export default function accountInit() {
  interceptor();
  verifyToken();

  $signUp.click(() => {
    window.location.href = "../views/register.html";
  });

  $signIn.click(() => {
    window.location.href = "../views/login.html";
  });

  $loginOut.click(() => {
    localStorage.removeItem("token");
    verifyToken();
  });
}
