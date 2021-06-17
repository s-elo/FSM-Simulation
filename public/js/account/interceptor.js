export default function interceptor() {
  $.ajaxSetup({
    beforeSend: (xhr, config) => {
      if (config.url !== "/login" && config.url !== "/register") {
        const token = localStorage.getItem("token");
        if (token) {
          xhr.setRequestHeader("authorization", token);
        } else {
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
    const { errStatus, message } = xhr.responseJSON;
    if (message) {
      alert(message);
    }
  });

  // when the reuqest is failed or just the status is not right
  $(document).ajaxError(function (event, request, settings) {
    const { errStatus, message } = request.responseJSON;

    if (message) {
      alert(message);
    }
  });
}
