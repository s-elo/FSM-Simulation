export default async function getUserInfo() {
  const res = await $.ajax({
    url: "/userInfo",
    dataType: "json",
    type: "GET",
  }).error((err) => {
    throw err;
  });

  if (res.errStatus === 1) {
    window.location.href = "login";
  } else {
    return res.userInfo;
  }
}
