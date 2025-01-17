const express = require("express");
const app = express();

const port = 3002;

app.get("/", (req, res) => {
  res.send("Welcome to the Simple API Server");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
