import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send(`Welcome to the Simple API Server ${process.env.APP_NAME}`);
});

app.listen(process.env.PORT || 3006, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
