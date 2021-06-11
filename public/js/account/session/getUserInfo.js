// import $ from 'jquery';

export default async function getUserInfo() {
  const res = await $.ajax({
    url: "/userInfo",
    dataType: "json",
    type: "GET",
  }).catch(() => {});
 
  if (res.errStatus === 1) {
    // token expired
    alert('you need to login again~');
    window.location.href = "../views/login.html";
  } else {
    return res.userInfo;
  }
}
