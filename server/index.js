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
  accessToken: "post_server_item",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

rollbar.log("Hello world!");

app.use(rollbar.errorHandler(0));

//heroku port and mine
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
