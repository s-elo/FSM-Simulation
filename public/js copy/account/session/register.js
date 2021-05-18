import { login } from "./login.js";
import interceptor from "../interceptor.js";

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

async function registerInit() {
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
      console.log('login');
      // alert(message);
      login({ ...rest });
    }
  });

  $btn.click((event) => {
    event.preventDefault();

    $form.submit();
  });
}

registerInit();

export { register, registerInit };
