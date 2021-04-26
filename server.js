const express = require("express");
// const temp = require('art-template');
const path = require("path");

const server = express();

const port = 3080;

server.use("/public/", express.static(path.join(__dirname, "./public/")));
server.engine("html", require("express-art-template"));

server.set("views", path.join(__dirname, "./views/"));

server.get("/", (_, res) => {
  res.render("design.html");
});

server.get("/design", (_, res) => {
  res.render("design.html");
});

server.get("/Instruction", (_, res) => {
  res.render("Instruction.html");
});

server.get("/Introduction", (_, res) => {
  res.render("Introduction.html");
});

server.get("/simulator", (_, res) => {
  res.render("simulator.html");
});

server.get("/register", (_, res) => {
  res.render("register.html");
});

server.get("/login", (_, res) => {
  res.render("login.html");
});

server.listen(port, function () {
  console.log(`running at ${port}.....`);
});
