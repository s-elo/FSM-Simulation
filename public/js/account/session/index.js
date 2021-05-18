import interceptor from "../interceptor.js";

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

function loginInit() {
  interceptor();

  const $form = $("form");
  const $btn = $("button");

  $form.submit((event) => {
    event.preventDefault();

    const formArr = $form.serializeArray();

    // convert into JSON format
    const formObj = {};
    for (const val of formArr) {
      const { name, value } = val;
      formObj[name] = value;
    }

    login(formObj);
  });

  $btn.click((event) => {
    event.preventDefault();

    $form.submit();
  });
}

async function register(params) {
  return await $.ajax({
    url: "/register",
    type: "POST",
    dataType: "json",
    data: { ...params },
  }).error((err) => {
    throw err;
  });
}

function registerInit() {
  interceptor();

  const $form = $("form");
  const $btn = $("button");

  $form.submit(async (event) => {
    event.preventDefault();

    const formArr = $form.serializeArray();

    // convert into JSON format
    const formObj = {};
    for (const val of formArr) {
      const { name, value } = val;
      formObj[name] = value;
    }

    const res = await register(formObj);

    console.log(res);
    // ...rest is the account info
    const { errStatus, message, ...rest } = res;

    if (errStatus === 0) {
      // alert(message);
      login({ ...rest });
    }
  });

  $btn.click((event) => {
    event.preventDefault();

    $form.submit();
  });
}

export { login, loginInit, register, registerInit };
