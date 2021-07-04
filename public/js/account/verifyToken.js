import getUserInfo from "./session/getUserInfo.js";
import getFSM from "./data/getFSM";
import initStateDiagram from "../dataHandler/initStateDiagram";
import clearStateDiagram from "../dataHandler/clearStateDiagram.js";
import deleteFSM from "./data/deleteFSM.js";

const $userInfo = $(".user-info");
const $userName = $(".user-name");
const $withoutLogin = $(".without-login");

function clearList() {
  const lis = document.querySelectorAll(
    ".user-info-menu > li:not(:first-child)"
  );

  for (const li of lis) {
    li.parentElement.removeChild(li);
  }
}

export async function renderDataList() {
  // get user info
  window.accountInfo = await getUserInfo();

  const { accountName, data } = accountInfo;

  $userName.html(accountName);

  const $mark = $(".login-out");

  clearList();

  for (const val of data) {
    const $li = $("<li/>");

    $li.html(`<span>${val}<div title="delete">-</div></span>`);

    $li.find("div").click(async (e) => {
      e.stopPropagation();
      // console.log(val);
      const msg = window.confirm(`Are you sure to delete ${val}`);

      if (!msg) return;

      try {
        await deleteFSM(val);

        renderDataList();
      } catch (err) {}
    });

    $li.click(async () => {
      const fsm = JSON.parse(await getFSM(val));

      // console.log(fsm.entityName);
      clearStateDiagram();

      initStateDiagram(fsm);
    });

    $mark.before($li);
  }
}

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

    renderDataList();
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
