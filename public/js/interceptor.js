$.ajaxSetup({
  beforeSend: (xhr, config) => {
    if (config.url !== "/login" && config.url !== "/register") {
      const token = localStorage.getItem("token");
      if (token) {
        xhr.setRequestHeader("authorization", token);
      } else {
        alert("You need to login again!");
      }
    }

    config.url = `http://localhost:8089${config.url}`;
    // allow cross origin...
    config.crossDomain = true;
  },
});
