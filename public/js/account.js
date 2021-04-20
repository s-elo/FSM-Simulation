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

  if (res.status === 0) {
    localStorage.setItem("token", res.token);
    window.location.href = "design";
  } else {
    alert(res.message);
  }
}

async function getUserInfo(token) {}

// register({
//   accountName: "test1",
//   password: "1234",
//   email: "pit@qq.com",
// });

// login({
//   accountName: "test2",
//   password: "123",
// });
