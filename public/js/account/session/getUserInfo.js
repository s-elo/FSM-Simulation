// import $ from 'jquery';

export default async function getUserInfo() {
  try {
    const res = await $.ajax({
      url: "/userInfo",
      dataType: "json",
      type: "GET",
    });

    return res.userInfo;
  } catch (err) {
    // token expired
    if (err.status === 403) {
      window.location.href = "../views/login.html";
    } else {
      // other errors
      return {
        accountName: "no server...",
      };
    }
  }
}
