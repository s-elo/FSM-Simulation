async function register(loginParams) {
  const a = await $.ajax({
    url: "http://localhost:8089/register",
    type: "POST",
    dataType: "json",
    data: { ...loginParams },
  }).error((err) => {
    console.log(err);
  });

  console.log(a);
  //   console.log(JSON.parse(a.data));
}

register({
  accountName: "test2",
  password: "123",
  email: "leo@qq.com",
});
