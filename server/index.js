const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const port = process.env.PORT || 5678;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use(express.json());
app.use("/js", express.static(path.join(__dirname, "public/main.js")));
app.use("/styles", express.static(path.join(__dirname, "../index.css")));
app.use("/pictures", express.static(path.join(__dirname, "../pictures")));
app.use("/javascript", express.static(path.join(__dirname, "../main.js")));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
