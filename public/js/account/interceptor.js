import { Loading } from "../utils";

export default function interceptor() {
  $.ajaxSetup({
    beforeSend: (xhr, config) => {
      Loading.show();
      if (config.url !== "/login" && config.url !== "/register") {
        const token = localStorage.getItem("token");
        if (token) {
          xhr.setRequestHeader("authorization", token);
        } else {
          Loading.hide();
          alert("You need to login!");
        }
      }

      config.url = `http://localhost:8089${config.url}`;
      // allow cross origin...
      config.crossDomain = true;
    },
  });

  // handle when request is successful
  $(document).ajaxSuccess((event, xhr, config) => {
    Loading.hide();
    const { errStatus, message } = xhr.responseJSON;
    if (message) {
      alert(message);
    }
  });

  // when the reuqest is failed or just the status is not right
  $(document).ajaxError(function (event, request, settings) {
    Loading.hide();
    const { errStatus = 1, message } = request.responseJSON || {};

    if (message) {
      alert(message);
    }
  });
}
