import verifyToken from "./verifyToken.js";
import interceptor from "./interceptor.js";

export default function accountInit() {
  interceptor();
  verifyToken();

  $userInfo.hover(
    () => {
      $menu.css({
        display: "block",
      });
    },
    () => {
      $menu.css({
        display: "none",
      });
    }
  );

  $signUp.click(() => {
    window.location.href = "register";
  });

  $signIn.click(() => {
    window.location.href = "login";
  });

  $loginOut.click(() => {
    localStorage.removeItem("token");
    verifyToken();
  });
}
