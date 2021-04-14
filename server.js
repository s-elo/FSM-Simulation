const express = require("express");
// const temp = require('art-template');
const path = require("path");

const server = express();

const port = 3000;

server.use("/public/", express.static(path.join(__dirname, "./public/")));
server.engine("html", require("express-art-template"));

server.set("views", path.join(__dirname, "./views/"));

server.get("/", (_, res) => {
  res.render("design.html");
});

server.get("/design.html", (_, res) => {
  res.render("design.html");
});

server.get("/Instruction.html", (_, res) => {
  res.render("Instruction.html");
});

server.get("/simulator.html", (_, res) => {
  res.render("simulator.html");
});

server.listen(port, function () {
  console.log(`running at ${port}.....`);
});
