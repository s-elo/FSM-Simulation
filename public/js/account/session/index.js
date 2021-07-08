import interceptor from "../interceptor.js";
import $ from "jquery";

async function login(params) {
  let res;

  try {
    res = await $.ajax({
      url: "/login",
      type: "POST",
      dataType: "json",
      data: { ...params },
    });
  } catch {
    return {
      errStatus: 1,
    };
  }

  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }

  localStorage.setItem("token", res.token);
  window.location.href = "../views/design.html";
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
  try {
    return await $.ajax({
      url: "/register",
      type: "POST",
      dataType: "json",
      data: { ...params },
    });
  } catch {
    return {
      errStatus: 1,
    };
  }
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
    const { errStatus, ...rest } = res;

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
