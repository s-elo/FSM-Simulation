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

  $(document).ajaxSuccess((event, xhr, config) => {
    const { errStatus, message } = xhr.responseJSON;
    // if (errStatus) {
    //   alert(message);
    // }
    alert(message);
  });
}
