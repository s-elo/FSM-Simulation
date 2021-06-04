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
    const userInfo = await getUserInfo();
    for (const key in userInfo) {
      accountInfo[key] = userInfo[key];
    }

    const { accountName } = userInfo;
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
