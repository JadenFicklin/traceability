//boilerplate
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());

//rollbar
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "7dcb7eeeac934aaf88742db28fffd5ef",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

rollbar.log("Hello world!");

//code
//rollbar log when page is loaded
app.get("/", (req, res) => {
  rollbar.info("HTML served successfully");
  res.sendFile(path.join(__dirname, "/index.html"));
});

//I dont know what this is but it helps with rollbar
app.use(rollbar.errorHandler(0));

//heroku port and local port
const port = process.env.PORT || 5678;

// connect files and folders middleware
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use(express.json());
app.use("/js", express.static(path.join(__dirname, "public/main.js")));
app.use("/styles", express.static(path.join(__dirname, "../index.css")));
app.use("/pictures", express.static(path.join(__dirname, "../pictures")));
app.use("/javascript", express.static(path.join(__dirname, "../main.js")));

//app.listen
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
