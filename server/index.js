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

//post name
app.post("/api/name", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  let returnName = {
    name,
  };
  res.status(200).send(returnName);
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
