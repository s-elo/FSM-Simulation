import getUserInfo from "./session/getUserInfo.js";

const $userInfo = $(".user-info");
const $userName = $(".user-name");
const $withoutLogin = $(".without-login");

export default async function verifyToken() {
  const token = localStorage.getItem("token");

  if (token) {
    // switch the status
    $userInfo.css({
      display: "block",
    });

    $withoutLogin.css({
      display: "none",
    });

    // get user info
    window.accountInfo = await getUserInfo();

    const { accountName } = accountInfo;

    $userName.html(accountName);
  } else {
    // switch the status
    $userInfo.css({
      display: "none",
    });

    $withoutLogin.css({
      display: "block",
    });
  }
}
