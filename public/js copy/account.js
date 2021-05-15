async function register(params) {
  return (res = await $.ajax({
    url: "/register",
    type: "POST",
    dataType: "json",
    data: { ...params },
  }).error((err) => {
    throw err;
  }));
}

async function login(params) {
  const res = await $.ajax({
    url: "/login",
    type: "POST",
    dataType: "json",
    data: { ...params },
  }).error((err) => {
    throw err;
  });

  if (res.errStatus === 0) {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }

    localStorage.setItem("token", res.token);
    window.location.href = "design";
  }
}

async function getUserInfo() {
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
